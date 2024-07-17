<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutUploadRequest;
use App\Models\Workout;
use DateTime;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WorkoutsController extends Controller {
    public function index() {
        $workouts = Workout::all();
        $sorted_workouts = $this->sortWorkoutsByDate($workouts);

        return Inertia::render('Workouts', ['workouts' => $sorted_workouts]);
    }

    public function create(WorkoutUploadRequest $request) {
        $workout_file = $request->file('workout_file');
        $dateTime     = new DateTime('@' . $request->date);
        $date         = $dateTime->format('Y-m-d');

        $results = $this->uploadWorkoutDigitalOcean($workout_file);

        if (!$results['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the workout. Try again or notify support.'
            ], 500);
        }

        $path = $results['path'];

        $workout = new Workout();
        $workout->file_path = $path;
        $workout->file_cdn = env('DO_WORKOUT_CDN_PREFIX') . $workout_file->getClientOriginalName();
        $workout->workout_date = $date;

        if (!$workout->save()) {
            if (Storage::disk('digital-ocean')->exists($path)) Storage::disk('digital-ocean')->delete($path);

            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the workout. Try again or notify support.'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Workout uploaded successfully!'
        ]);
    }

    private function uploadWorkoutDigitalOcean($file): array {
        $path = '';
        $return_results = [];

        try {
            $path = Storage::disk('digital-ocean')->putFileAs('workouts', $file, $file->getClientOriginalName(), 'public');
            $return_results['path'] = $path;
            $return_results['success'] = true;
        } catch (Exception $e) {
            Log::error($e);

            $return_results['success'] = false;
        }

        return $return_results;
    }

    private function sortWorkoutsByDate(Collection $workouts): array {
        $groupedData = [];

        foreach ($workouts as $workout) {
            $date = new DateTime($workout->workout_date);
            $year = $date->format('Y');
            $month = $date->format('m');

            if (!isset($groupedData[$year][$month])) {
                $groupedData[$year][$month] = [];
            }

            $groupedData[$year][$month][] = $workout;
        }

        return $groupedData;
    }
}
