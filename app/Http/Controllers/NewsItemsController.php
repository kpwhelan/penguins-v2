<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewNewsItemRequest;
use App\Models\NewsItem;
use App\Services\AssetStorageService;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class NewsItemsController extends Controller
{
    use JsonResponseTrait;

    public function __construct(private readonly AssetStorageService $assets) {}

    public function store(NewNewsItemRequest $request): JsonResponse
    {
        $upload = null;

        try {
            if ($request->hasFile('news_image')) {
                $upload = $this->assets->storePublicImage($request->file('news_image'), 'news-images');
            }

            NewsItem::create([
                'title' => $request->string('title'),
                'body' => $request->string('body'),
                'image_disk' => $upload['disk'] ?? null,
                'image_path' => $upload['path'] ?? null,
                'image_original_name' => $upload['original_name'] ?? null,
                'image_mime_type' => $upload['mime_type'] ?? null,
                'image_size' => $upload['size'] ?? null,
                'image_cdn' => null,
            ]);
        } catch (Exception $exception) {
            if ($upload) {
                $this->assets->delete($upload['disk'], $upload['path']);
            }

            Log::error('News item upload failed.', ['exception' => $exception, 'user_id' => $request->user()->id]);

            return $this->errorResponse('The news item could not be published. Please try again or contact support.', 500);
        }

        return $this->successResponse('News item published successfully.', [], 201);
    }
}
