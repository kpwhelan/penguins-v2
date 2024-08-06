<?php

namespace App\Http\Controllers;

use App\Http\Requests\SwimmerBioUploadRequest;
use App\Models\SwimmerBio;
use App\Traits\FileUploadTrait;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SwimmerBioController extends Controller {
    use FileUploadTrait, JsonResponseTrait;

    private $image_upload_results;
    private $swimmer_bio_model_saved_successfully;

    public function store(SwimmerBioUploadRequest $request) {
        $swimmer_image = $request->file('swimmer_image');

        $this->image_upload_results = $this->uploadfileDigitalOcean($swimmer_image, 'swimmer-bios/');

        if (!$this->image_upload_results['success']) return $this->errorResponse('Uh oh, something went wrong uploading that image. Try again or contact support.', 500);

        $path = $this->image_upload_results['path'];

        $swimmer_bio = new SwimmerBio();
        $swimmer_bio->swimmer_name = $request->swimmer_name;
        $swimmer_bio->body = $request->body;
        $swimmer_bio->image_cdn = config('filesystems.disks.digital-ocean.swimmer_bio_image_cdn') . '/' . $swimmer_image->getClientOriginalName();

        try {
            $this->swimmer_bio_model_saved_successfully = $swimmer_bio->save();
        } catch(Exception $e) {
            $user = Auth::user();
            $this->swimmer_bio_model_saved_successfully = false;

            Log::error($e, [
                'user_id' => $user->id,
                'user_name' => "{$user->first_name} {$user->last_name}",
                'message' => "User was attempting to upload a new swimmer bio"
            ]);
        }

        if (!$this->swimmer_bio_model_saved_successfully) {
            $this->deleteFileDigitalOcean($path);

            return $this->errorResponse('Uh oh, something went wrong uploading the bio. Try again or contact support.', 500);
        }


        return $this->successResponse('Uploaded Successfully!', [], 201);
    }
}
