<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CalendarController extends Controller {
    public function index() {
        return Inertia::render('Calendar', ['events' => Event::all()]);
    }

    public function signUp(EventRequest $request): JsonResponse {
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

    public function bulkSignUp(Request $request) {
        $dates = $request->input('dates');
        $user = User::find($request->input('user_id'));

        DB::beginTransaction();
        foreach($dates as $date) {
            $event = Event::firstOrNew(['date' => $date]);
            $event->user_name = "{$user->first_name} {$user->last_name}";
            $event->user_id = $user->id;
    
            if (!$event->save()) {
                DB::rollBack();
                return response()->json([
                    'message' => "Something went wrong, try again or contact support",
                    'success' => false,
                ], 500);
            }
        }

        DB::commit();

        return response()->json([
            'message' => "{$user->first_name} {$user->last_name} has been signed up for the selected dates!",
            'success' => true,
            'events'   => Event::all(),
        ], 201);
    }
}
