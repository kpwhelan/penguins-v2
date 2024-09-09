<?php

namespace App\Console\Commands;

use App\Mail\DeckDutyReminderEmail;
use App\Models\DeckDutyEvent;
use Carbon\Carbon;
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
    public function handle() {
        $this->info('Looking up deck duty...');
        $deck_duty_event = DeckDutyEvent::where('date', '=', Carbon::tomorrow('EST')->format('Y-m-d'))->first();

        if (!$deck_duty_event) {
            $this->info('No deck duty event found for tomorrow...');
            return;
        }

        $this->info('Sending email...');
        Mail::to(config('app.env') === 'prod' ? $deck_duty_event->user->email : 'kevinwhelandev@gmail.com')->send(new DeckDutyReminderEmail($deck_duty_event->user->first_name));

        $this->info('Email sent!');
    }
}
