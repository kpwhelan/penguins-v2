<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\TokenRegistrationRequest;
use App\Jobs\DeactivateRegistrationToken;
use App\Jobs\SendRegistrationTokenEmail;
use App\Models\RegistrationToken;
use App\Models\User;
use App\Traits\JsonResponseTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller {
    use JsonResponseTrait;

    private $registration_token_model_successully_saved;

    public function index() {
        $users = User::all();

        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request) {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone_number' => 'nullable|string',
            'street_address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'zipcode' => 'nullable|string',
            'is_sharing_info' => 'boolean',
            'emergency_contact' => 'nullable|string',
            'emergency_contact_phone' => 'nullable|string',
        ]);

        try {
            $user = User::create($request->all());

            // $registration_token = new RegistrationToken();
            // $registration_token->email = $user->email;
            // $registration_token->registration_token = Str::password(16, symbols: false);
            $token_generation_results = RegistrationToken::generateRegistrationToken($user->email);
        } catch(Exception $e) {
            Log::error($e, [
                'message' => 'Error occured while attempting to make a new user'
            ]);

            $token_generation_results['successfully_saved'] = false;
        }

        if (!$token_generation_results) return $this->errorResponse('Something went wrong while saving the user, try again or contact support.', 500);

        RegistrationToken::dispatchRegistrationTokenEmailJob($user, $token_generation_results['token_record']->registration_token);
        RegistrationToken::dispatchRegistrationTokenExpirationJob($token_generation_results['token_record']->registration_token);
        // SendRegistrationTokenEmail::dispatch($user, $token_generation_results['token_record']->registration_token)->onQueue('send_registration_email');
        // DeactivateRegistrationToken::dispatch($token_generation_results['token_record']->registration_token)->delay(now()->addHours(48))->onQueue('set_registration_token_expired');

        // event(new Registered($user));

        return $this->successResponse('User successfully created. An email has been sent to the user with instructions on how to complete their website registration.', [], 201);

        // Auth::login($user);

        // return redirect(route('dashboard', absolute: false));
    }

    public function tokenRegister(TokenRegistrationRequest $request) {
        $token_record = RegistrationToken::where([
            ['registration_token', '=', $request->token],
            ['email', '=', $request->email],
            ['is_expired', '=', false],
            ['successfully_registered', '=', false]
        ])->first();

        if (!$token_record) return $this->errorResponse('No record exists for this email and token.', 404);
        if ($token_record->is_expired) return $this->errorResponse('This token has expired. Please reach out to Chris Landry to regenerate one for you.', 401);

        $user = User::where('email', '=', $request->email)->first();

        $user->password = $request->password;

        try {
            $user->save();
        } catch (Exception $e) {
            Log::error($e, ['message' => 'Someone was trying to register with a token, this occured trying to save the user']);
            return $this->errorResponse('Uh oh, something went wrong. Please try again.');
        }

        $token_record->update(['successfully_registered' => true]);

        return $this->successResponse('Registered Successfully!', [], 200);
    }
}
