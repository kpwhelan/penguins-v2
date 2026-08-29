<?php

namespace Tests\Unit;

use App\Http\Requests\BulkEventRequest;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class BulkEventRequestTest extends TestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_only_administrators_are_authorized(): void
    {
        $request = BulkEventRequest::create('/calendar/bulk-event', 'POST');

        $request->setUserResolver(fn () => (new User)->forceFill(['is_admin' => false]));
        $this->assertFalse($request->authorize());

        $request->setUserResolver(fn () => (new User)->forceFill(['is_admin' => true]));
        $this->assertTrue($request->authorize());
    }

    public function test_an_admin_can_clear_upcoming_practice_dates(): void
    {
        Carbon::setTestNow('2026-08-29 09:00:00');
        $request = BulkEventRequest::create('/calendar/bulk-event', 'POST', [
            'dates' => ['2026-08-31', '2026-09-02'],
            'user_id' => 'clear',
        ]);

        $validator = Validator::make($request->all(), $request->rules());

        $this->assertTrue($validator->passes());
    }

    public function test_bulk_dates_must_be_distinct_upcoming_practice_days(): void
    {
        Carbon::setTestNow('2026-08-29 09:00:00');

        foreach ([
            ['2026-08-31', '2026-08-31'],
            ['2026-08-30'],
            ['2026-08-28'],
        ] as $dates) {
            $request = BulkEventRequest::create('/calendar/bulk-event', 'POST', ['dates' => $dates, 'user_id' => 'clear']);
            $validator = Validator::make($request->all(), $request->rules());

            $this->assertTrue($validator->fails());
        }
    }
}
