<?php

namespace Tests\Unit;

use App\Mail\DeckDutyReminderEmail;
use Tests\TestCase;

class DeckDutyReminderEmailTest extends TestCase
{
    public function test_it_uses_the_configured_deck_duty_sender(): void
    {
        config()->set('mail.deck_duty_from_address', 'deckduty@granitestatepenguins.com');

        $envelope = (new DeckDutyReminderEmail('Kevin', 'Sunday, August 30, 2026'))->envelope();

        $this->assertSame('deckduty@granitestatepenguins.com', $envelope->from->address);
        $this->assertSame('Granite State Penguins', $envelope->from->name);
    }
}
