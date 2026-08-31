<?php

namespace Tests\Unit;

use App\Http\Requests\WorkoutUploadRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class WorkoutUploadRequestTest extends TestCase
{
    public function test_it_accepts_a_month_and_year_without_a_day(): void
    {
        $validator = Validator::make([
            'month' => '2026-08',
            'workout_file' => UploadedFile::fake()->create('workout.pdf', 100, 'application/pdf'),
        ], (new WorkoutUploadRequest)->rules());

        $this->assertTrue($validator->passes());
    }

    public function test_it_rejects_full_dates_and_malformed_months(): void
    {
        foreach (['2026-08-31', '08-2026', 'not-a-month'] as $month) {
            $validator = Validator::make([
                'month' => $month,
                'workout_file' => UploadedFile::fake()->create('workout.pdf', 100, 'application/pdf'),
            ], (new WorkoutUploadRequest)->rules());

            $this->assertTrue($validator->fails(), "Expected {$month} to be rejected.");
        }
    }
}
