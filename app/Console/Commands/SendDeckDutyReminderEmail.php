<?php

namespace App\Console\Commands;

use App\Mail\DeckDutyReminderEmail;
use App\Models\DeckDutyEvent;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class SendDeckDutyReminderEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deckduty:send_reminder_email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a reminder email to user who is scheduled for deck duty the next day.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $timezone = 'America/New_York';
        $tomorrow = CarbonImmutable::now($timezone)->addDay();

        $events = DeckDutyEvent::query()
            ->with('user')
            ->whereDate('date', $tomorrow->toDateString())
            ->whereNull('reminder_sent_at')
            ->get();

        if ($events->isEmpty()) {
            $this->info("No unsent deck duty reminders found for {$tomorrow->toDateString()}.");

            return self::SUCCESS;
        }

        $failures = 0;

        foreach ($events as $event) {
            if (!$event->user || !$event->user->email) {
                $this->warn("Deck duty event {$event->id} has no member email address; reminder skipped.");

                continue;
            }

            $recipient = config('mail.deck_duty_reminder_override_address') ?: $event->user->email;

            try {
                Mail::to($recipient)->send(new DeckDutyReminderEmail(
                    $event->user->first_name,
                    $tomorrow->format('l, F j, Y'),
                ));

                $event->forceFill(['reminder_sent_at' => now()])->save();
                $this->info("Deck duty reminder sent for event {$event->id}.");
            } catch (Throwable $exception) {
                $failures++;
                $this->error("Deck duty reminder failed for event {$event->id}; continuing with the remaining reminders.");
                Log::error('Deck duty reminder could not be sent.', [
                    'event_id' => $event->id,
                    'user_id' => $event->user_id,
                    'exception' => $exception,
                ]);
            }
        }

        return $failures === 0 ? self::SUCCESS : self::FAILURE;
    }
}
