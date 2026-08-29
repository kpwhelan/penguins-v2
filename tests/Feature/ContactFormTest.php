<?php

namespace Tests\Feature;

use App\Mail\ContactEmail;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    public function test_local_override_receives_contact_form_messages(): void
    {
        Mail::fake();
        config()->set('mail.contact_form_recipient_address', 'team@example.com');
        config()->set('mail.contact_form_override_address', 'developer@example.com');

        $response = $this->postJson(route('contact.send'), $this->validMessage());

        $response->assertOk()->assertJson(['success' => true]);
        Mail::assertSent(ContactEmail::class, function (ContactEmail $mail): bool {
            return $mail->hasTo('developer@example.com')
                && $mail->envelope()->from->address === 'website@granitestatepenguins.com'
                && $mail->envelope()->from->name === 'Granite State Penguins Website'
                && $mail->envelope()->replyTo[0]->address === 'swimmer@example.com';
        });
    }

    public function test_configured_team_address_receives_messages_without_an_override(): void
    {
        Mail::fake();
        config()->set('mail.contact_form_recipient_address', 'team@example.com');
        config()->set('mail.contact_form_override_address', null);

        $response = $this->postJson(route('contact.send'), $this->validMessage());

        $response->assertOk()->assertJson(['success' => true]);
        Mail::assertSent(ContactEmail::class, fn (ContactEmail $mail): bool => $mail->hasTo('team@example.com'));
    }

    public function test_missing_recipient_returns_a_safe_error(): void
    {
        Mail::fake();
        config()->set('mail.contact_form_recipient_address', null);
        config()->set('mail.contact_form_override_address', null);

        $response = $this->postJson(route('contact.send'), $this->validMessage());

        $response->assertStatus(500)->assertJson(['success' => false]);
        Mail::assertNothingSent();
    }

    private function validMessage(): array
    {
        return [
            'name' => 'Test Swimmer',
            'email' => 'swimmer@example.com',
            'message' => 'I would like to learn more about joining practice.',
        ];
    }
}
