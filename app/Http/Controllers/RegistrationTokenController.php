<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationTokenRequest;
use App\Models\RegistrationToken;
use App\Models\User;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RegistrationTokenController extends Controller {
    use JsonResponseTrait;

    public function generateRegistrationToken(RegistrationTokenRequest $request): JsonResponse {
        $email = $request->email;
        $user = User::where('email', $email)->first();

        // $token_generation_results = RegistrationToken::generateRegistrationToken($email);
        $token_record = RegistrationToken::where([
            ['email', $email],
            ['has_been_resent', false]
        ])->first();

        $token_record->registration_token = Str::password(16, symbols: false);
        $token_record->is_expired = false;
        $token_record->email_successfully_sent = false;
        $token_record->has_been_resent = true;

        if (!$token_record->save()) return $this->errorResponse('Something went wrong generating the token, try again or contact support', 500);

        RegistrationToken::dispatchRegistrationTokenEmailJob($user, $token_record->registration_token);
        RegistrationToken::dispatchRegistrationTokenExpirationJob($token_record);

        $tokens = RegistrationToken::where('successfully_registered', '=', 'false')->get();

        return $this->successResponse('Successfully sent a new registration email!', ['tokens' => $tokens]);
    }
}
