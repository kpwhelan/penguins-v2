<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\DeactivateRegistrationToken;
use App\Jobs\SendRegistrationTokenEmail;
use App\Mail\NewUserRegistraitonEmail;
use App\Models\RegistrationToken;
use App\Models\User;
use App\Traits\JsonResponseTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
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

            $registration_token = new RegistrationToken();
            $registration_token->email = $user->email;
            $registration_token->registration_token = Str::password(16);
            $this->registration_token_model_successully_saved = $registration_token->save();
        } catch(Exception $e) {
            Log::error($e, [
                'message' => 'Error occured while attempting to make a new user'
            ]);

            $this->registration_token_model_successully_saved = false;
        }

        if (!$this->registration_token_model_successully_saved) return $this->errorResponse('Something went wrong while saving the user, try again or contact support.', 500);

        SendRegistrationTokenEmail::dispatch($user, $registration_token->registration_token)->onQueue('send_registration_email');
        DeactivateRegistrationToken::dispatch($registration_token)->delay(now()->addHours(48))->onQueue('set_registration_token_expired');

        // event(new Registered($user));

        return $this->successResponse('User successfully created. An email has been sent to the user with instructions on how to complete their website registration.', [], 201);

        // Auth::login($user);

        // return redirect(route('dashboard', absolute: false));
    }
}
