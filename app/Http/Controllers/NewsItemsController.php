<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewNewsItemRequest;
use App\Models\NewsItem;
use App\Traits\FileUploadTrait;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NewsItemsController extends Controller {
    use FileUploadTrait;

    private $image_upload_results;

    public function index() {

    }

    public function store(NewNewsItemRequest $request) {
        $news_image = $request->file('news_image');
        $title = $request->title;
        $body = $request->body;
        $path = '';

        if ($news_image) {

            $this->image_upload_results = $this->uploadfileDigitalOcean($news_image, 'news-images');

            if (!$this->image_upload_results['success']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Uh oh, something went wrong uploading that image. Try again or contact support.'
                ], 500);
            }

            $path = $this->image_upload_results['path'];
        }

        $news_item = new NewsItem();
        $news_item->title = $title;
        $news_item->body = $body;
        if (isset($news_image)) {
            $news_item->image_path = $path;
            $news_item->image_cdn = config('filesystems.disks.digital-ocean.news_image_cdn_prefix') . $news_image->getClientOriginalName();
        }

        if (!$news_item->save()) {
            if (Storage::disk('digital-ocean')->exists($path)) Storage::disk('digital-ocean')->delete($path);

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
}
