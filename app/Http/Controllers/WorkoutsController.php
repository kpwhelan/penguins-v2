<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutUploadRequest;
use App\Models\Workout;
use App\Traits\FileUploadTrait;
use DateTime;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WorkoutsController extends Controller {
    use FileUploadTrait;

    public function index() {
        $workouts = Workout::all();
        $sorted_workouts = $this->sortWorkoutsByDate($workouts);

        return Inertia::render('Workouts', ['workouts' => $sorted_workouts]);
    }

    public function store(WorkoutUploadRequest $request) {
        $workout_file = $request->file('workout_file');
        $dateTime     = new DateTime('@' . $request->date);
        $year         = $dateTime->format('Y');
        $month        = $dateTime->format('m');
        $date         = $dateTime->format('Y-m-d');

        if (Workout::where('file_name', $workout_file->getClientOriginalName())->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'A workout with that file name already exists, please change file name and try again!'
            ], 500);
        }

        try {
            $results = $this->uploadfileDigitalOcean($workout_file, "workouts/", "{$year}/{$month}");
        } catch (Exception $e) {
            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the workout. Try again or notify support.'
            ], 500);
        }

        if (!$results['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the workout. Try again or notify support.'
            ], 500);
        }

        $path = $results['path'];

        $workout = new Workout();
        $workout->file_path = $path;
        $workout->file_cdn = config('filesystems.disks.digital-ocean.workout_cdn_prefix') . '/' . "{$year}/{$month}/" . $workout_file->getClientOriginalName();
        $workout->file_name = $workout_file->getClientOriginalName();
        $workout->workout_date = $date;

        if (!$workout->save()) {
            if (Storage::disk('digital-ocean')->exists($path)) Storage::disk('digital-ocean')->delete($path);

            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the workout. Try again or notify support.'
            ], 500);
        }

        $workouts = Workout::all();

        return response()->json([
            'success' => true,
            'message' => 'Workout uploaded successfully!',
            'workouts'  => $this->sortWorkoutsByDate($workouts),
        ], 201);
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
