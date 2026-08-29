<?php

namespace App\Models;

use App\Services\AssetStorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];

    protected $fillable = [
        'title',
        'body',
        'image_path',
        'image_disk',
        'image_cdn',
        'image_original_name',
        'image_mime_type',
        'image_size',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return app(AssetStorageService::class)->publicUrl($this->image_disk, $this->image_path, $this->image_cdn);
    }
}
