<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

trait FileUploadTrait {
    protected function uploadfileDigitalOcean($file, $directory_path, $sub_directories = null): array {
        $path = '';
        $return_results = [];

        try {
            $path = Storage::disk('digital-ocean')->putFileAs("$directory_path/" . config('app.env') . '/' . $sub_directories, $file, $file->getClientOriginalName(), 'public');

            $return_results['path'] = $path;
            $return_results['success'] = !$path ? false : true;
        } catch (Exception $e) {
            Log::error($e);

            $return_results['success'] = false;
        }

        return $return_results;
    }

    // private function uploadWorkoutDigitalOcean($file, $year, $month): array {
    //     $path = '';
    //     $return_results = [];

    //     try {
    //         $path = Storage::disk('digital-ocean')->putFileAs("workouts/{$year}/{$month}", $file, $file->getClientOriginalName(), 'public');
    //         $return_results['path'] = $path;
    //         $return_results['success'] = true;
    //     } catch (Exception $e) {
    //         Log::error($e);

    //         $return_results['success'] = false;
    //     }

    //     return $return_results;
    // }
}
