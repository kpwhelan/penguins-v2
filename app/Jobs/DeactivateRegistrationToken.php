<?php

namespace App\Jobs;

use App\Models\RegistrationToken;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DeactivateRegistrationToken implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public RegistrationToken $token) {
    }

    /**
     * Execute the job.
     */
    public function handle(): void {

        $this->token->is_expired = true;

        try {
            $this->token->save();
        } catch(Exception $e) {
            Log::error($e);
        }
    }
}
