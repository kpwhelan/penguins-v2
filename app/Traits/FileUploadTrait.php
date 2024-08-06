<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Facades\Auth;
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
            $user = Auth::user();

            Log::error($e,[
                'user_id' => $user->id,
                'user_name' => "{$user->first_name} {$user->last_name}",
                'message' => "User tried to upload an image with path: {$directory_path} and it encountered an issue."
            ]);

            $return_results['success'] = false;
        }

        return $return_results;
    }

    protected function deleteFileDigitalOcean($path): void {
        try {
            if (Storage::disk('digital-ocean')->exists($path)) Storage::disk('digital-ocean')->delete($path);
        } catch(Exception $e) {
            $user = Auth::user();

            Log::error($e, [
                'user_id' => $user->id,
                'user_name' => "{$user->first_name} {$user->last_name}",
                'message' => "Error occured during attempt to delete a file from Digital Ocean with path: {$path}"
            ]);
        }
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
