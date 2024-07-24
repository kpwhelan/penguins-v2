<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewNewsItemRequest;
use App\Models\NewsItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NewsItemsController extends Controller {
    private $image_upload_results;

    public function index() {

    }

    public function create(NewNewsItemRequest $request) {
        $news_image = $request->file('news_image');
        $title = $request->title;
        $body = $request->body;
        $path = '';

        if ($news_image) {
            $this->image_upload_results = $this->uploadImageDigitalOcean($news_image);
            $path = $this->image_upload_results['path'];
        }

        if ($news_image && !$this->image_upload_results['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong uploading that image. Try again or contact support.'
            ], 500);
        }

        $news_item = new NewsItem();
        $news_item->title = $title;
        $news_item->body = $body;
        if (isset($news_image)) {
            $news_item->image_path = $path;
            $news_item->image_cdn = env('DO_NEWS_IMAGE_CDN_PREFIX') . $news_image->getClientOriginalName();
        }

        if (!$news_item->save()) {
            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong. Try again or contact support.'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Uploaded Successfully!'
        ], 201);
    }

    private function uploadImageDigitalOcean($file): array {
        $path = '';
        $return_results = [];

        try {
            $path = Storage::disk('digital-ocean')->putFileAs("news-images", $file, $file->getClientOriginalName(), 'public');
            $return_results['path'] = $path;
            $return_results['success'] = true;
        } catch (Exception $e) {
            Log::error($e);

            $return_results['success'] = false;
        }

        return $return_results;
    }
}
