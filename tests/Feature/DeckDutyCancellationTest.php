<?php

namespace Tests\Feature;

use App\Mail\DeckDutyReminderEmail;
use App\Models\DeckDutyEvent;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DeckDutyCancellationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->travelTo(now()->setDate(2026, 11, 12)->setTime(12, 0));
        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        DB::purge('sqlite');
        DB::connection('sqlite')->getPdo();

        Schema::create('users', function (Blueprint $table): void {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->boolean('is_admin')->default(false);
            $table->timestamps();
        });

        Schema::create('deck_duty_events', function (Blueprint $table): void {
            $table->id();
            $table->date('date')->unique();
            $table->string('user_name')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamp('reminder_sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function test_member_can_cancel_their_signup_and_another_member_can_claim_the_date(): void
    {
        $member = $this->member();
        $event = $this->assignment($member);

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(0, 'deckDutyEvents');

        $this->assertDatabaseMissing('deck_duty_events', ['id' => $event->id]);

        $replacement = $this->member();
        $this->actingAs($replacement)->postJson(route('calendar.signup'), ['date' => '2026-11-13'])
            ->assertCreated()
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('deck_duty_events', [
            'user_id' => $replacement->id,
            'reminder_sent_at' => null,
        ]);
        $this->assertSame('2026-11-13', DeckDutyEvent::sole()->date->toDateString());
    }

    public function test_member_cannot_cancel_another_members_signup_even_if_they_are_an_admin(): void
    {
        $event = $this->assignment($this->member());

        foreach ([false, true] as $isAdmin) {
            $other = $this->member();
            $other->forceFill(['is_admin' => $isAdmin]);

            $this->actingAs($other)->deleteJson(route('calendar.cancel', $event->id))
                ->assertConflict()
                ->assertJsonPath('success', false)
                ->assertJsonPath('deckDutyEvents.0.id', $event->id);
        }

        $this->assertDatabaseHas('deck_duty_events', ['id' => $event->id, 'user_id' => $event->user_id]);
    }

    public function test_past_assignments_cannot_be_cancelled_and_still_count_on_the_dashboard(): void
    {
        $member = $this->member();
        $event = $this->assignment($member, '2026-11-11');

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertConflict();

        $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
            ->where('deck_duty_count', 1)
        );
        $this->assertDatabaseHas('deck_duty_events', ['id' => $event->id]);
    }

    public function test_cancellation_updates_next_duty_without_changing_completed_duty_count(): void
    {
        $member = $this->member();
        $this->assignment($member, '2026-11-11');
        $event = $this->assignment($member);
        $next = $this->assignment($member, '2026-11-16');

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertOk();

        $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
            ->where('deck_duty_count', 1)
            ->where('next_deck_duty.id', $next->id)
            ->where('next_deck_duty_date', 'Monday, November 16')
        );
    }

    public function test_stale_cancellation_cannot_remove_an_assignment_taken_over_by_someone_else(): void
    {
        $member = $this->member();
        $replacement = $this->member();
        $event = $this->assignment($member);

        $this->actingAs($replacement)->postJson(route('calendar.signup'), [
            'date' => '2026-11-13',
            'confirm_override' => true,
        ])->assertCreated();

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))
            ->assertConflict()
            ->assertJsonPath('deckDutyEvents.0.user_id', $replacement->id);

        $this->assertDatabaseHas('deck_duty_events', ['id' => $event->id, 'user_id' => $replacement->id]);
    }

    public function test_repeated_cancellation_does_not_remove_a_new_signup_for_the_same_date(): void
    {
        $member = $this->member();
        $event = $this->assignment($member);

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertOk();
        $newEvent = $this->assignment($member);

        $this->deleteJson(route('calendar.cancel', $event->id))->assertConflict();
        $this->assertDatabaseHas('deck_duty_events', ['id' => $newEvent->id]);
    }

    public function test_guest_cannot_cancel_a_signup(): void
    {
        $event = $this->assignment($this->member());

        $this->deleteJson(route('calendar.cancel', $event->id))->assertUnauthorized();
        $this->assertDatabaseHas('deck_duty_events', ['id' => $event->id]);
    }

    public function test_cancelled_signup_receives_no_reminder_and_replacement_receives_theirs(): void
    {
        Mail::fake();
        config()->set('mail.deck_duty_reminder_override_address', null);
        $member = $this->member();
        $event = $this->assignment($member);

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertOk();
        $this->artisan('deckduty:send_reminder_email')->assertSuccessful();
        Mail::assertNothingSent();

        $replacement = $this->member();
        $this->actingAs($replacement)->postJson(route('calendar.signup'), ['date' => '2026-11-13'])
            ->assertCreated();

        $this->artisan('deckduty:send_reminder_email')->assertSuccessful();
        Mail::assertSent(DeckDutyReminderEmail::class, fn ($mail) => $mail->hasTo($replacement->email));
        Mail::assertSentCount(1);
    }

    public function test_member_can_cancel_even_if_the_reminder_has_already_been_sent(): void
    {
        $member = $this->member();
        $event = $this->assignment($member);
        $event->update(['reminder_sent_at' => now()]);

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertOk();
        $this->assertDatabaseMissing('deck_duty_events', ['id' => $event->id]);
    }

    public function test_same_day_cancellation_follows_the_existing_same_day_signup_rule(): void
    {
        $this->travelTo(now()->addDay());
        $member = $this->member();
        $event = $this->assignment($member);

        $this->actingAs($member)->deleteJson(route('calendar.cancel', $event->id))->assertOk();
    }

    public function test_admin_bulk_clearing_still_works_and_regular_members_cannot_use_it(): void
    {
        $member = $this->member();
        $event = $this->assignment($member);
        $payload = ['dates' => ['2026-11-13'], 'user_id' => 'clear'];

        $this->actingAs($member)->postJson(route('calendar.bulk.signup'), $payload)->assertForbidden();
        $this->assertDatabaseHas('deck_duty_events', ['id' => $event->id]);

        $admin = $this->member();
        $admin->forceFill(['is_admin' => true]);
        $this->actingAs($admin)->postJson(route('calendar.bulk.signup'), $payload)->assertOk();
        $this->assertDatabaseMissing('deck_duty_events', ['id' => $event->id]);
    }

    private function member(): User
    {
        return User::forceCreate([
            'first_name' => 'Jamie',
            'last_name' => 'Penguin',
            'email' => 'jamie'.User::count().'@example.com',
        ]);
    }

    private function assignment(User $member, string $date = '2026-11-13'): DeckDutyEvent
    {
        // Use the DATE representation MySQL stores in production. SQLite does
        // not normalize Eloquent's datetime serialization to a DATE column.
        $id = DB::table('deck_duty_events')->insertGetId([
            'date' => $date,
            'user_id' => $member->id,
            'user_name' => "{$member->first_name} {$member->last_name}",
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return DeckDutyEvent::findOrFail($id);
    }
}
