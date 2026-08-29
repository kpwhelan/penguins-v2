<?php

namespace Tests\Unit;

use App\Mail\NewUserRegistraitonEmail;
use App\Models\User;
use Tests\TestCase;

class RegistrationEmailTest extends TestCase
{
    public function test_it_uses_the_configured_registration_sender_and_reply_address(): void
    {
        config()->set('mail.registration_from_address', 'registration@granitestatepenguins.com');
        config()->set('mail.registration_reply_to_address', 'chris@example.com');

        $user = new User(['first_name' => 'New', 'last_name' => 'Swimmer']);
        $envelope = (new NewUserRegistraitonEmail('test-token', $user))->envelope();

        $this->assertSame('registration@granitestatepenguins.com', $envelope->from->address);
        $this->assertSame('Granite State Penguins', $envelope->from->name);
        $this->assertSame('chris@example.com', $envelope->replyTo[0]->address);
    }
}
