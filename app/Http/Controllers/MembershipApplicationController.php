<?php

namespace App\Http\Controllers;

use App\Http\Requests\MembershipApplicationUploadRequest;
use App\Services\AssetStorageService;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MembershipApplicationController extends Controller
{
    use JsonResponseTrait;

    public function __construct(private readonly AssetStorageService $assets) {}

    public function show(): RedirectResponse
    {
        $disk = config('filesystems.uploads.public_disk');
        $path = config('filesystems.uploads.membership_application_path');

        return redirect()->away(Storage::disk($disk)->url($path));
    }

    public function store(MembershipApplicationUploadRequest $request): JsonResponse
    {
        try {
            $this->assets->replacePublicDocument(
                $request->file('application_file'),
                config('filesystems.uploads.membership_application_path'),
            );
        } catch (Exception $exception) {
            Log::error('Membership application upload failed.', [
                'exception' => $exception,
                'user_id' => $request->user()->id,
            ]);

            return $this->errorResponse('The membership application could not be updated. Please try again.', 500);
        }

        return $this->successResponse('Membership application updated successfully.');
    }
}
