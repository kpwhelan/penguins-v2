<?php

namespace App\Jobs;

use App\Mail\NewUserRegistraitonEmail;
use App\Models\RegistrationToken;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendRegistrationTokenEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(protected User $user, protected string $token)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->user->email)->send(new NewUserRegistraitonEmail($this->token, $this->user));

        $token_record = RegistrationToken::where([
            ['email', '=', $this->user->email],
            ['registration_token', '=', $this->token]
        ])->first();

        $token_record->email_successfully_sent = true;
        $token_record->save();
    }
}
