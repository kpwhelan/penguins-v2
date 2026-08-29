<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationTokenRequest;
use App\Models\RegistrationToken;
use App\Models\User;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\JsonResponse;

class RegistrationTokenController extends Controller
{
    use JsonResponseTrait;

    public function store(RegistrationTokenRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->firstOrFail();
        RegistrationToken::issue($user, $request->user());

        return $this->successResponse('A new private registration link has been sent.', [
            'tokens' => RegistrationToken::where('successfully_registered', false)->latest()->get(),
        ]);
    }
}
