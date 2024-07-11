<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CalendarController extends Controller {
    public function index() {
        return Inertia::render('Calendar', ['events' => Event::all()]);
    }

    public function signUp(EventRequest $request) {
        $date = $request->input('date');
        $user = Auth::user();

        $event = Event::firstOrNew(['date' => $date]);
        $event->user_name = "{$user->first_name} {$user->last_name}";
        $event->user_id = $user->id;

        if (!$event->save()) {
            return response()->json([
                'message' => "Something went wrong, try again or contact support",
                'success' => false,
            ], 500);
        }

        return response()->json([
            'message' => "You're signed up for deck duty!",
            'success' => true,
            'events'   => Event::all(),
        ], 201);
    }
}
