<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsItemsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkoutsController;
use App\Models\Event;
use App\Models\NewsItem;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $news_items = NewsItem::all();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'newsItems' => $news_items
    ]);
});

Route::get('/membership', function () {
    return Inertia::render('Membership');
})->name('membership');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/dashboard', function () {
    $user_id = Auth::user()->id;
    $deck_duty_count = Event::where('user_id', '=', $user_id)
        ->whereDate('date', '>', Carbon::now()->subDays(30))
        ->whereDate('date', '<', Carbon::now())
        ->get()
        ->count();

    $next_deck_duty = Event::where('user_id', '=', $user_id)
        ->whereDate('date', '>=', Carbon::today())
        ->first();

    return Inertia::render('Dashboard', ['deck_duty_count' => $deck_duty_count, 'next_deck_duty' => $next_deck_duty]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/directory', function () {
    $users = User::where('is_sharing_info', '1')->get();

    return Inertia::render('Directory', ['users' => $users]);
})->middleware('auth')->name('directory');

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
    Route::post('/', [WorkoutsController::class, 'create'])->name('workouts.create');
});

Route::middleware('auth')->prefix('news')->group(function () {
    Route::get('/', [NewsItemsController::class, 'index'])->name('newsitems');
    Route::post('/', [NewsItemsController::class, 'create'])->name('newsitems.create');
});

Route::middleware('auth')->prefix('user')->group(function () {
    Route::get('/', [RegisteredUserController::class, 'index'])->name('users');
});

Route::post('/contact', [ContactController::class, 'sendNewContactEmail'])->name('contact.send');

require __DIR__.'/auth.php';
