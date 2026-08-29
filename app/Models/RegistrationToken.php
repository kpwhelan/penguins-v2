<?php

namespace App\Models;

use App\Jobs\SendRegistrationTokenEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RegistrationToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'invited_by',
        'registration_token',
        'token_hash',
        'expires_at',
        'completed_at',
        'is_expired',
        'successfully_registered',
        'has_been_resent'
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'completed_at' => 'datetime',
            'email_successfully_sent' => 'boolean',
            'is_expired' => 'boolean',
            'successfully_registered' => 'boolean',
        ];
    }

    public static function issue(User $user, User $inviter): self
    {
        static::where('email', $user->email)
            ->whereNull('completed_at')
            ->update(['is_expired' => true]);

        $plainToken = Str::random(64);
        $invitation = static::create([
            'email' => $user->email,
            'invited_by' => $inviter->id,
            'registration_token' => '',
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => now()->addHours(48),
        ]);

        SendRegistrationTokenEmail::dispatch($invitation, $plainToken)->afterCommit();

        return $invitation;
    }

    public function registrationUrl(string $plainToken): string
    {
        return URL::temporarySignedRoute(
            'invitation.show',
            $this->expires_at,
            ['invitation' => $this->id, 'token' => $plainToken],
        );
    }

    public function accepts(string $plainToken): bool
    {
        return ! $this->is_expired
            && ! $this->successfully_registered
            && $this->completed_at === null
            && $this->expires_at?->isFuture()
            && $this->token_hash
            && hash_equals($this->token_hash, hash('sha256', $plainToken));
    }
}
