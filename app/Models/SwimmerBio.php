<?php

namespace App\Models;

use App\Services\AssetStorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SwimmerBio extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];

    protected $fillable = [
        'swimmer_name',
        'image_disk',
        'image_path',
        'image_cdn',
        'image_original_name',
        'image_mime_type',
        'image_size',
        'body',
    ];

    public function getImageUrlAttribute(): ?string
    {
        return app(AssetStorageService::class)->publicUrl($this->image_disk, $this->image_path, $this->image_cdn);
    }
}
