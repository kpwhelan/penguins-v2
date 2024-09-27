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

        $token_generation_results = RegistrationToken::generateRegistrationToken($email);

        if (!$token_generation_results['successfully_saved']) return $this->errorResponse('Something went wrong generating the token, try again or contact support', 500);

        RegistrationToken::dispatchRegistrationTokenEmailJob($user, $token_generation_results['token_record']->registration_token);
        RegistrationToken::dispatchRegistrationTokenExpirationJob($token_generation_results['token_record']);

        return $this->successResponse('Successfully sent a new registration email!');
    }
}
