<?php

namespace Tests\Unit;

use App\Http\Requests\EventRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class EventRequestTest extends TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_it_accepts_upcoming_practice_days(): void
    {
        Carbon::setTestNow('2026-08-29 09:00:00');

        foreach (['2026-08-31', '2026-09-02', '2026-09-04'] as $date) {
            $validator = Validator::make(['date' => $date], (new EventRequest)->rules());

            $this->assertTrue($validator->passes(), "Expected {$date} to be an eligible deck-duty date.");
        }
    }

    public function test_any_authenticated_member_may_submit_an_assignment_override(): void
    {
        $this->assertTrue((new EventRequest)->authorize());
    }

    public function test_it_rejects_weekends_and_non_practice_weekdays(): void
    {
        Carbon::setTestNow('2026-08-29 09:00:00');

        foreach (['2026-08-30', '2026-09-01', '2026-09-03'] as $date) {
            $validator = Validator::make(['date' => $date], (new EventRequest)->rules());

            $this->assertTrue($validator->fails(), "Expected {$date} to be rejected.");
        }
    }

    public function test_it_rejects_past_and_malformed_dates(): void
    {
        Carbon::setTestNow('2026-08-29 09:00:00');

        foreach (['2026-08-28', '09/02/2026', 'not-a-date'] as $date) {
            $validator = Validator::make(['date' => $date], (new EventRequest)->rules());

            $this->assertTrue($validator->fails(), "Expected {$date} to be rejected.");
        }
    }
}
