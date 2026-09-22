<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class MembershipRate extends Model
{
    public const DEFAULTS = [
        'quarterly' => 135,
        'monthly' => 50,
        'drop_in' => 10,
    ];

    protected $fillable = [
        'quarterly',
        'monthly',
        'drop_in',
    ];

    protected function casts(): array
    {
        return [
            'quarterly' => 'decimal:2',
            'monthly' => 'decimal:2',
            'drop_in' => 'decimal:2',
        ];
    }

    public static function current(): self
    {
        if (! Schema::hasTable((new static)->getTable())) {
            return new static(self::DEFAULTS);
        }

        return static::query()->first() ?? new static(self::DEFAULTS);
    }

    public function forDisplay(): array
    {
        return [
            'quarterly' => $this->quarterly,
            'monthly' => $this->monthly,
            'drop_in' => $this->drop_in,
        ];
    }
}
