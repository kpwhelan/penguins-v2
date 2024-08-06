<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewNewsItemRequest;
use App\Models\NewsItem;
use App\Traits\FileUploadTrait;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class NewsItemsController extends Controller {
    use FileUploadTrait, JsonResponseTrait;

    private $image_upload_results;
    private $news_item_model_saved_successfully;

    public function index() {

    }

    public function store(NewNewsItemRequest $request) {
        $news_image = $request->file('news_image');
        $title = $request->title;
        $body = $request->body;
        $path = '';

        //image is optional so if there is one, lets try to upload it first
        //and fail gracefully if there's an issue
        if ($news_image) {
            $this->image_upload_results = $this->uploadfileDigitalOcean($news_image, 'news-images');

            if (!$this->image_upload_results['success']) return $this->errorResponse('Uh oh, something went wrong uploading that image. Try again or contact support.', 500);

            $path = $this->image_upload_results['path'];
        }

        $news_item = new NewsItem();
        $news_item->title = $title;
        $news_item->body = $body;
        if (isset($news_image)) {
            $news_item->image_path = $path;
            $news_item->image_cdn = config('filesystems.disks.digital-ocean.news_image_cdn_prefix') . '/' . $news_image->getClientOriginalName();
        }

        try {
            $this->news_item_model_saved_successfully = $news_item->save();
        } catch(Exception $e) {
            $user = Auth::user();
            $this->news_item_model_saved_successfully = false;

            Log::error($e, [
                'user_id' => $user->id,
                'user_name' => "{$user->first_name} {$user->last_name}",
                'message' => "User was attempting to upload a new news item."
            ]);
        }

        if (!$this->news_item_model_saved_successfully) {
            $this->deleteFileDigitalOcean($path);

            return $this->errorResponse('Uh oh, something went wrong. Try again or contact support.', 500);
        }

        return $this->successResponse('Uploaded Successfully!', [], 201);
    }
}
