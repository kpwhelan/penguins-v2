<?php

namespace Tests\Feature;

use App\Models\DeckDutyEvent;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        DB::purge('sqlite');
        DB::connection('sqlite')->getPdo();

        Schema::create('deck_duty_events', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->time('time')->nullable();
            $table->string('user_name')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamp('reminder_sent_at')->nullable();
            $table->timestamps();
        });
    }

    public function test_next_deck_duty_date_is_formatted_for_display(): void
    {
        $user = new User();
        $user->forceFill([
            'id' => 1,
            'first_name' => 'Jamie',
            'last_name' => 'Penguin',
            'email' => 'jamie@example.com',
        ]);

        DeckDutyEvent::create([
            'date' => '2026-11-09',
            'user_id' => $user->id,
            'user_name' => 'Jamie Penguin',
        ]);

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('next_deck_duty_date', 'Monday, November 9')
            );
    }
}
