<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\DeckDutyEvent;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CalendarController extends Controller {
    public function index() {
        return Inertia::render('Calendar', ['deckDutyEvents' => DeckDutyEvent::all()]);
    }

    public function signUp(EventRequest $request): JsonResponse {
        $date = $request->input('date');
        $user = Auth::user();

        $event = DeckDutyEvent::firstOrNew(['date' => $date]);
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
            'deckDutyEvents'   => DeckDutyEvent::all(),
        ], 201);
    }

    public function bulkSignUp(Request $request) {
        $dates = $request->input('dates');
        $user = $request->input('user_id') === 'clear' ? $request->input('user_id') : User::find($request->input('user_id'));

        if (!$user === 'clear') {
            DB::beginTransaction();
            foreach($dates as $date) {
                $event = DeckDutyEvent::firstOrNew(['date' => $date]);
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
                'deckDutyEvents'   => DeckDutyEvent::all(),
            ], 201);
        }

        if ($user === 'clear') {
            DB::beginTransaction();

            try {
                foreach($dates as $date) {
                    $date_exists = DeckDutyEvent::where('date', '=', $date)->exists();

                    if ($date_exists) {
                        $event = DeckDutyEvent::where('date', '=', $date)->delete();
                    }
                }
            } catch(Exception $e) {
                Log::error($e);
                DB::rollBack();

                return response()->json([
                    'message' => "Something went wrong, try again or contact support",
                    'success' => false,
                ], 500);
            }

            DB::commit();

            return response()->json([
                'message' => "The selected dates have been cleared!",
                'success' => true,
                'deckDutyEvents'   => DeckDutyEvent::all(),
            ], 200);
        }
    }
}
