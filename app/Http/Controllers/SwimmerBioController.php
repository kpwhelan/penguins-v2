<?php

namespace App\Http\Controllers;

use App\Http\Requests\SwimmerBioUploadRequest;
use App\Models\SwimmerBio;
use App\Traits\FileUploadTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SwimmerBioController extends Controller {
    use FileUploadTrait;

    private $image_upload_results;

    public function store(SwimmerBioUploadRequest $request) {
        $swimmer_image = $request->file('swimmer_image');

        $this->image_upload_results = $this->uploadfileDigitalOcean($swimmer_image, 'swimmer-bios/');

        if (!$this->image_upload_results['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading that image. Try again or contact support.'
            ], 500);
        }


        $path = $this->image_upload_results['path'];

        $swimmer_bio = new SwimmerBio();
        $swimmer_bio->swimmer_name = $request->swimmer_name;
        $swimmer_bio->body = $request->body;
        $swimmer_bio->image_cdn = config('filesystems.disks.digital-ocean.swimmer_bio_image_cdn') . '/' . $swimmer_image->getClientOriginalName();

        if (!$swimmer_bio->save()) {
            if (Storage::disk('digital-ocean')->exists($path)) Storage::disk('digital-ocean')->delete($path);

            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading the bio. Try again or contact support.'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Uploaded Successfully!'
        ], 201);
    }
}
