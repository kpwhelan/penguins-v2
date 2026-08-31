<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkoutUploadRequest;
use App\Models\Workout;
use App\Services\AssetStorageService;
use DateTime;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class WorkoutsController extends Controller
{
    public function __construct(private readonly AssetStorageService $assets) {}

    public function index(): Response
    {
        return Inertia::render('Workouts', [
            'workouts' => $this->sortWorkoutsByDate(Workout::all()),
        ]);
    }

    public function store(WorkoutUploadRequest $request): JsonResponse
    {
        $file = $request->file('workout_file');
        $dateTime = new DateTime($request->validated('month').'-01');
        $year = $dateTime->format('Y');
        $month = $dateTime->format('m');
        $upload = null;

        try {
            $upload = $this->assets->storePrivateDocument($file, "workouts/{$year}/{$month}");

            Workout::create([
                'file_name' => $file->getClientOriginalName(),
                'file_disk' => $upload['disk'],
                'file_path' => $upload['path'],
                'file_mime_type' => $upload['mime_type'],
                'file_size' => $upload['size'],
                'file_cdn' => null,
                'workout_date' => $dateTime->format('Y-m-d'),
            ]);
        } catch (Exception $exception) {
            if ($upload) {
                $this->assets->delete($upload['disk'], $upload['path']);
            }

            Log::error('Workout upload failed.', ['exception' => $exception, 'user_id' => $request->user()->id]);

            return response()->json(['success' => false, 'message' => 'The workout could not be uploaded. Please try again or contact support.'], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Workout uploaded successfully.',
            'workouts' => $this->sortWorkoutsByDate(Workout::all()),
        ], 201);
    }

    public function download(Workout $workout): RedirectResponse|StreamedResponse|BinaryFileResponse
    {
        if ($workout->file_disk && $workout->file_path) {
            $disk = Storage::disk($workout->file_disk);

            if ($disk->providesTemporaryUrls()) {
                return redirect()->away($disk->temporaryUrl($workout->file_path, now()->addMinutes(10)));
            }

            return $disk->download($workout->file_path, $workout->file_name);
        }

        abort_unless($workout->file_cdn, 404);

        return redirect()->away($workout->file_cdn);
    }

    private function sortWorkoutsByDate(Collection $workouts): array
    {
        $groupedData = [];

        foreach ($workouts as $workout) {
            $date = new DateTime($workout->workout_date);
            $groupedData[$date->format('Y')][$date->format('m')][] = $workout;
        }

        return $groupedData;
    }
}
