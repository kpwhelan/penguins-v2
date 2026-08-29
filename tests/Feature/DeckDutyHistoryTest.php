<?php

namespace Tests\Feature;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class DeckDutyHistoryTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        DB::purge('sqlite');
        DB::connection('sqlite')->getPdo();
        DB::statement('PRAGMA foreign_keys = ON');

        Schema::create('users', function (Blueprint $table) {
            $table->id();
        });

        Schema::create('deck_duty_events', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->string('user_name')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        });

        $migration = require database_path('migrations/2026_08_29_220000_preserve_deck_duty_history_when_users_are_deleted.php');
        $migration->up();
    }

    public function test_deleting_a_member_preserves_their_historical_deck_duty_record(): void
    {
        $userId = DB::table('users')->insertGetId([]);
        $eventId = DB::table('deck_duty_events')->insertGetId([
            'date' => now()->subDay()->toDateString(),
            'user_id' => $userId,
            'user_name' => 'Jamie Penguin',
        ]);

        DB::table('users')->where('id', $userId)->delete();

        $this->assertDatabaseHas('deck_duty_events', [
            'id' => $eventId,
            'user_id' => null,
            'user_name' => 'Jamie Penguin',
        ]);
    }
}
