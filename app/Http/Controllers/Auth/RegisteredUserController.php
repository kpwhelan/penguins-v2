<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RegistrationToken;
use App\Models\User;
use App\Traits\JsonResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    use JsonResponseTrait;

    public function index(): JsonResponse
    {
        return response()->json(['success' => true, 'users' => User::all()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'phone_number' => ['nullable', 'string'],
            'street_address' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'state' => ['nullable', 'string'],
            'zipcode' => ['nullable', 'string'],
            'is_sharing_info' => ['boolean'],
            'emergency_contact' => ['nullable', 'string'],
            'emergency_contact_phone' => ['nullable', 'string'],
        ]);

        DB::transaction(function () use ($validated, $request) {
            $user = User::create($validated);
            RegistrationToken::issue($user, $request->user());
        });

        return $this->successResponse('Member created. Their private registration link is on its way.', [], 201);
    }

    public function create(Request $request, RegistrationToken $invitation, string $token): Response
    {
        abort_unless($invitation->accepts($token), 404);
        $user = User::where('email', $invitation->email)->firstOrFail();

        return Inertia::render('Auth/Register', [
            'member' => ['first_name' => $user->first_name, 'email' => $user->email],
            'submitUrl' => $request->fullUrl(),
        ]);
    }

    public function complete(Request $request, RegistrationToken $invitation, string $token): JsonResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ]);

        DB::transaction(function () use ($invitation, $token, $validated) {
            $lockedInvitation = RegistrationToken::query()->lockForUpdate()->findOrFail($invitation->id);
            abort_unless($lockedInvitation->accepts($token), 404);

            User::where('email', $lockedInvitation->email)->firstOrFail()->update([
                'password' => $validated['password'],
            ]);

            $lockedInvitation->update([
                'successfully_registered' => true,
                'completed_at' => now(),
                'is_expired' => true,
            ]);
        });

        return $this->successResponse('Your account is ready. You can now sign in.');
    }
}
