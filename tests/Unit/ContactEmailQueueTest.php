<?php

namespace Tests\Unit;

use App\Mail\ContactEmail;
use Tests\TestCase;

class ContactEmailQueueTest extends TestCase
{
    public function test_contact_email_retries_temporary_delivery_failures(): void
    {
        $mail = new ContactEmail('Test Swimmer', 'swimmer@example.com', 'Hello');

        $this->assertSame(3, $mail->tries);
        $this->assertSame(30, $mail->timeout);
        $this->assertSame([60, 300, 900], $mail->backoff);
    }
}
