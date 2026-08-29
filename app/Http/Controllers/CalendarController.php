<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkEventRequest;
use App\Http\Requests\EventRequest;
use App\Models\DeckDutyEvent;
use App\Models\User;
use Exception;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Calendar', [
            'deckDutyEvents' => $this->calendarEvents(),
            'members' => $user->is_admin
                ? User::query()->orderBy('last_name')->orderBy('first_name')->get(['id', 'first_name', 'last_name'])
                : [],
        ]);
    }

    public function signUp(EventRequest $request): JsonResponse
    {
        $date = $request->input('date');
        $user = Auth::user();

        $event = DeckDutyEvent::firstOrNew(['date' => $date]);

        if ($event->exists && $event->user_id !== $user->id && ! $request->boolean('confirm_override')) {
            return response()->json([
                'message' => 'Someone is already assigned to this date. Please confirm before replacing them.',
                'success' => false,
                'requires_confirmation' => true,
                'deckDutyEvents' => $this->calendarEvents(),
            ], 409);
        }

        $event->user_name = "{$user->first_name} {$user->last_name}";
        $event->user_id = $user->id;

        if ($event->isDirty('user_id')) {
            $event->reminder_sent_at = null;
        }

        try {
            $event->save();
        } catch (UniqueConstraintViolationException $exception) {
            Log::notice('Deck duty date was claimed during a concurrent signup.', [
                'date' => $date,
                'user_id' => $user->id,
                'exception' => $exception,
            ]);

            return response()->json([
                'message' => 'That date was just claimed by another swimmer. The calendar has been refreshed.',
                'success' => false,
                'deckDutyEvents' => $this->calendarEvents(),
            ], 409);
        }

        return response()->json([
            'message' => "You're signed up for deck duty!",
            'success' => true,
            'deckDutyEvents' => $this->calendarEvents(),
        ], 201);
    }

    public function bulkSignUp(BulkEventRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $dates = $validated['dates'];
        $isClearing = $validated['user_id'] === 'clear';
        $user = $isClearing ? null : User::findOrFail($validated['user_id']);

        try {
            DB::transaction(function () use ($dates, $isClearing, $user): void {
                if ($isClearing) {
                    DeckDutyEvent::whereIn('date', $dates)->delete();

                    return;
                }

                foreach ($dates as $date) {
                    DeckDutyEvent::updateOrCreate(
                        ['date' => $date],
                        [
                            'user_name' => "{$user->first_name} {$user->last_name}",
                            'user_id' => $user->id,
                            'reminder_sent_at' => null,
                        ],
                    );
                }
            });
        } catch (Exception $exception) {
            Log::error($exception);

            return response()->json([
                'message' => 'Something went wrong. Please try again or contact support.',
                'success' => false,
            ], 500);
        }

        return response()->json([
            'message' => $isClearing
                ? 'The selected dates have been cleared.'
                : "{$user->first_name} {$user->last_name} has been assigned to the selected dates.",
            'success' => true,
            'deckDutyEvents' => $this->calendarEvents(),
        ], $isClearing ? 200 : 201);
    }

    private function calendarEvents()
    {
        return DeckDutyEvent::query()
            ->orderBy('date')
            ->get(['id', 'date', 'user_name', 'user_id']);
    }
}
