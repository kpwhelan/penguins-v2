<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeckDutyEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'user_name',
        'user_id',
        'reminder_sent_at',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'reminder_sent_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
