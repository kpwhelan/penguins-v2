<?php

namespace App\Console\Commands;

use App\Mail\DeckDutyReminderEmail;
use App\Models\DeckDutyEvent;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

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

        foreach ($events as $event) {
            if (!$event->user || !$event->user->email) {
                $this->warn("Deck duty event {$event->id} has no member email address; reminder skipped.");

                continue;
            }

            $recipient = config('mail.deck_duty_reminder_override_address') ?: $event->user->email;

            Mail::to($recipient)->send(new DeckDutyReminderEmail(
                $event->user->first_name,
                $tomorrow->format('l, F j, Y'),
            ));

            $event->forceFill(['reminder_sent_at' => now()])->save();
            $this->info("Deck duty reminder sent for event {$event->id}.");
        }

        return self::SUCCESS;
    }
}
