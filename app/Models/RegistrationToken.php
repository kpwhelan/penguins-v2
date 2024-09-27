<?php

namespace App\Models;

use App\Jobs\DeactivateRegistrationToken;
use App\Jobs\SendRegistrationTokenEmail;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'registration_token',
        'is_expired',
        'successfully_registered'
    ];

    public static function generateRegistrationToken(string $email): array {
        $registration_token = new RegistrationToken();
        $registration_token->email = $email;
        $registration_token->registration_token = Str::password(16, symbols: false);
        $registration_token_model_successully_saved = $registration_token->save();

        return [
            'successfully_saved' => $registration_token_model_successully_saved,
            'token_record' => $registration_token
        ];
    }

    public static function dispatchRegistrationTokenEmailJob(User $user, string $token): bool {
        SendRegistrationTokenEmail::dispatch($user, $token)->onQueue('send_registration_email');

        return true;
    }

    public static function dispatchRegistrationTokenExpirationJob(RegistrationToken $token): bool {
        DeactivateRegistrationToken::dispatch($token)->delay(now()->addHours(48))->onQueue('set_registration_token_expired');

        return true;
    }
}
