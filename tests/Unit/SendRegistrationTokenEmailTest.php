<?php

namespace Tests\Unit;

use App\Jobs\SendRegistrationTokenEmail;
use App\Models\RegistrationToken;
use Tests\TestCase;

class SendRegistrationTokenEmailTest extends TestCase
{
    public function test_registration_email_retries_temporary_delivery_failures(): void
    {
        $job = new SendRegistrationTokenEmail(new RegistrationToken, 'plain-token');

        $this->assertSame(3, $job->tries);
        $this->assertSame(30, $job->timeout);
        $this->assertSame([60, 300, 900], $job->backoff);
    }
}
