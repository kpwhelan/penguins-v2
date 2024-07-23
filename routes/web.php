<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkoutsController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/membership', function () {
    return Inertia::render('Membership');
})->name('membership');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/directory', function () {
    $users = User::where('is_sharing_info', '1')->get();

    return Inertia::render('Directory', ['users' => $users]);
})->name('directory');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('calendar')->group(function () {
    Route::get('/', [CalendarController::class, 'index'])->name('calendar');
    Route::post('/event', [CalendarController::class, 'signUp'])->name('calendar.signup');
});

Route::middleware('auth')->prefix('workouts')->group(function () {
    Route::get('/', [WorkoutsController::class, 'index'])->name('workouts');
    Route::post('/', [WorkoutsController::class, 'create'])->name('workouts.create');
});

Route::post('/contact', [ContactController::class, 'sendNewContactEmail'])->name('contact.send');

require __DIR__.'/auth.php';
