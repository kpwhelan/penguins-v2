<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $duplicateDates = DB::table('deck_duty_events')
            ->select('date')
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 1')
            ->pluck('date');

        foreach ($duplicateDates as $date) {
            $events = DB::table('deck_duty_events')
                ->where('date', $date)
                ->orderBy('id')
                ->get(['id', 'user_id', 'user_name']);

            $assignments = $events
                ->map(fn (object $event): string => $event->user_id.'|'.$event->user_name)
                ->unique();

            if ($assignments->count() > 1) {
                throw new \RuntimeException("Deck duty date {$date} has conflicting assignments and must be resolved before migrating.");
            }

            DB::table('deck_duty_events')
                ->whereIn('id', $events->pluck('id')->slice(1))
                ->delete();
        }

        Schema::table('deck_duty_events', function (Blueprint $table): void {
            $table->unique('date', 'deck_duty_events_date_unique');
        });
    }

    public function down(): void
    {
        Schema::table('deck_duty_events', function (Blueprint $table): void {
            $table->dropUnique('deck_duty_events_date_unique');
        });
    }
};
