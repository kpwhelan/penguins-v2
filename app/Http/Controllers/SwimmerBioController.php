<?php

namespace App\Http\Controllers;

use App\Http\Requests\SwimmerBioUploadRequest;
use App\Models\SwimmerBio;
use App\Services\AssetStorageService;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class SwimmerBioController extends Controller
{
    use JsonResponseTrait;

    public function __construct(private readonly AssetStorageService $assets) {}

    public function store(SwimmerBioUploadRequest $request): JsonResponse
    {
        $upload = null;

        try {
            $upload = $this->assets->storePublicImage($request->file('swimmer_image'), 'swimmer-bios');

            SwimmerBio::create([
                'swimmer_name' => $request->string('swimmer_name'),
                'body' => $request->string('body'),
                'image_disk' => $upload['disk'],
                'image_path' => $upload['path'],
                'image_original_name' => $upload['original_name'],
                'image_mime_type' => $upload['mime_type'],
                'image_size' => $upload['size'],
                'image_cdn' => null,
            ]);
        } catch (Exception $exception) {
            if ($upload) {
                $this->assets->delete($upload['disk'], $upload['path']);
            }

            Log::error('Swimmer bio upload failed.', ['exception' => $exception, 'user_id' => $request->user()->id]);

            return $this->errorResponse('The swimmer profile could not be published. Please try again or contact support.', 500);
        }

        return $this->successResponse('Swimmer profile published successfully.', [], 201);
    }
}
