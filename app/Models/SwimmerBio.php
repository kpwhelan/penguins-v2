<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SwimmerBio extends Model
{
    use HasFactory;

    protected $fillable = [
        'swimmer_name',
        'image_cdn',
        'body'
    ];
}
