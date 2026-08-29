<?php

namespace App\Jobs;

use App\Mail\NewUserRegistraitonEmail;
use App\Models\RegistrationToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeEncrypted;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendRegistrationTokenEmail implements ShouldBeEncrypted, ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(protected RegistrationToken $invitation, protected string $token)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $user = \App\Models\User::where('email', $this->invitation->email)->firstOrFail();
        Mail::to($user->email)->send(new NewUserRegistraitonEmail(
            $this->invitation->registrationUrl($this->token),
            $user,
        ));

        $this->invitation->update(['email_successfully_sent' => true]);
    }
}
