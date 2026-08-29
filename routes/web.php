<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MembershipApplicationController;
use App\Http\Controllers\NewsItemsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationTokenController;
use App\Http\Controllers\SwimmerBioController;
use App\Http\Controllers\WorkoutsController;
use App\Models\DeckDutyEvent;
use App\Models\NewsItem;
use App\Models\RegistrationToken;
use App\Models\SwimmerBio;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)
    ->name('home');

Route::get('/membership', function () {
    return Inertia::render('Membership');
})->name('membership');

Route::get('/membership/application', [MembershipApplicationController::class, 'show'])
    ->name('membership.application');

Route::post('/membership/application', [MembershipApplicationController::class, 'store'])
    ->middleware(['auth', 'admin'])
    ->name('membership.application.store');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/sitemap.xml', function () {
    return response()
        ->view('sitemap', [
            'urls' => [
                ['location' => route('home'), 'priority' => '1.0'],
                ['location' => route('membership'), 'priority' => '0.9'],
                ['location' => route('about-us'), 'priority' => '0.8'],
            ],
        ])
        ->header('Content-Type', 'application/xml; charset=UTF-8');
})->name('sitemap');

Route::get('/dashboard', function () {
    $user_id = Auth::user()->id;
    $deck_duty_count = DeckDutyEvent::where('user_id', '=', $user_id)
        ->whereDate('date', '>', Carbon::now()->subDays(30))
        ->whereDate('date', '<', Carbon::now())
        ->get()
        ->count();

    $next_deck_duty = DeckDutyEvent::where('user_id', '=', $user_id)
        ->whereDate('date', '>=', Carbon::today())
        ->first();

    return Inertia::render('Dashboard', ['deck_duty_count' => $deck_duty_count, 'next_deck_duty' => $next_deck_duty]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create-new-user', function () {
    return Inertia::render('CreateNewUser');
})->middleware(['auth', 'admin'])->name('create-new-user');

Route::get('/directory', function () {
    $users = User::query()
        ->where('is_sharing_info', true)
        ->orderBy('last_name')
        ->orderBy('first_name')
        ->get(User::DIRECTORY_FIELDS);

    return Inertia::render('Directory', ['users' => $users]);
})->middleware('auth')->name('directory');

Route::get('/registration-status', function () {
    $registration_tokens = RegistrationToken::where('successfully_registered', '=', 'false')->get();

    return Inertia::render('RegistrationStatus', ['registration_tokens' => $registration_tokens]);
})->middleware(['auth', 'admin'])->name('registration-status');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('calendar')->group(function () {
    Route::get('/', [CalendarController::class, 'index'])->name('calendar');
    Route::post('/event', [CalendarController::class, 'signUp'])->name('calendar.signup');
    Route::post('/bulk-event', [CalendarController::class, 'bulkSignUp'])->name('calendar.bulk.signup');
});

Route::middleware('auth')->prefix('workouts')->group(function () {
    Route::get('/', [WorkoutsController::class, 'index'])->name('workouts');
    Route::post('/', [WorkoutsController::class, 'store'])->name('workouts.store');
    Route::get('/{workout}/download', [WorkoutsController::class, 'download'])->name('workouts.download');
});

Route::middleware('auth')->prefix('news')->group(function () {
    Route::get('/', [NewsItemsController::class, 'index'])->name('newsitems');
    Route::post('/', [NewsItemsController::class, 'store'])->name('newsitems.store');
});

Route::middleware('auth')->prefix('swimmer-bios')->group(function () {
    Route::post('/', [SwimmerBioController::class, 'store'])->name('swimmer-bios.store');
});

Route::middleware(['auth', 'admin'])->prefix('user')->group(function () {
    Route::get('/', [RegisteredUserController::class, 'index'])->name('users');
    Route::post('/', [RegisteredUserController::class, 'store'])->name('users.store');
});

Route::middleware(['auth', 'admin'])->prefix('registration-token')->group(function () {
    Route::post('/', [RegistrationTokenController::class, 'store'])->name('registration-token.store');
});

Route::post('/contact', [ContactController::class, 'sendNewContactEmail'])
    ->middleware('throttle:contact-form')
    ->name('contact.send');

if (app()->environment('local')) {
    Route::get('/dev/emails/deck-duty-reminder', function () {
        config(['mail.default' => 'array']);

        if (app()->bound('debugbar')) {
            app('debugbar')->disable();
        }

        return new App\Mail\DeckDutyReminderEmail(
            'Kevin',
            now('America/New_York')->addDay()->format('l, F j, Y'),
        );
    });

    Route::get('/dev/emails/contact', function () {
        config(['mail.default' => 'array']);

        if (app()->bound('debugbar')) {
            app('debugbar')->disable();
        }

        return new App\Mail\ContactEmail(
            'Taylor Morgan',
            'taylor@example.com',
            "Hi! I recently moved to the area and I’m interested in joining a Masters practice. Could you tell me a little more about the group and what I should bring for my first swim?",
        );
    });

    Route::get('/dev/emails/registration-invitation', function () {
        config(['mail.default' => 'array']);

        if (app()->bound('debugbar')) {
            app('debugbar')->disable();
        }

        $user = new User([
            'first_name' => 'Taylor',
            'last_name' => 'Morgan',
            'email' => 'taylor@example.com',
        ]);

        return new App\Mail\NewUserRegistraitonEmail(
            route('invitation.show', ['invitation' => 1, 'token' => 'preview-token']),
            $user,
        );
    });
}

require __DIR__.'/auth.php';
