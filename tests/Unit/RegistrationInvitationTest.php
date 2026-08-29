<?php

namespace Tests\Unit;

use App\Models\RegistrationToken;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class RegistrationInvitationTest extends TestCase
{
    public function test_it_accepts_only_its_matching_unexpired_token(): void
    {
        $plainToken = 'a-private-random-token';
        $invitation = new RegistrationToken([
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => Carbon::now()->addHour(),
            'is_expired' => false,
            'successfully_registered' => false,
        ]);

        $this->assertTrue($invitation->accepts($plainToken));
        $this->assertFalse($invitation->accepts('the-wrong-token'));
    }

    public function test_it_rejects_expired_and_completed_invitations(): void
    {
        $plainToken = 'a-private-random-token';
        $invitation = new RegistrationToken([
            'token_hash' => hash('sha256', $plainToken),
            'expires_at' => Carbon::now()->subMinute(),
        ]);

        $this->assertFalse($invitation->accepts($plainToken));

        $invitation->expires_at = Carbon::now()->addHour();
        $invitation->completed_at = Carbon::now();

        $this->assertFalse($invitation->accepts($plainToken));
    }
}
