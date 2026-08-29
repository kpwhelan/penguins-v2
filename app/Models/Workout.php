<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    protected $appends = ['download_url'];

    protected $fillable = [
        'file_path',
        'file_disk',
        'file_cdn',
        'file_mime_type',
        'file_size',
        'workout_date',
        'file_name'
    ];

    public function getDownloadUrlAttribute(): string
    {
        return route('workouts.download', $this);
    }
}
