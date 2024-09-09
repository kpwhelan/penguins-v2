<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

//days of week are 0 indexed starting on Sunday

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('deckduty:send_reminder_email')->dailyAt('08:00')->days([0, 2, 4,])->timezone('America/New_York');
