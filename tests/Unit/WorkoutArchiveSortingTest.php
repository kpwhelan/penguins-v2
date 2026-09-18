<?php

namespace Tests\Unit;

use App\Http\Controllers\WorkoutsController;
use App\Models\Workout;
use Illuminate\Database\Eloquent\Collection;
use ReflectionClass;
use Tests\TestCase;

class WorkoutArchiveSortingTest extends TestCase
{
    public function test_workouts_are_grouped_in_reverse_chronological_order_with_naturally_sorted_files(): void
    {
        $workouts = new Collection([
            new Workout(['file_name' => 'Workout-10.pdf', 'workout_date' => '2024-12-01']),
            new Workout(['file_name' => 'Workout-2.pdf', 'workout_date' => '2024-12-01']),
            new Workout(['file_name' => 'Workout-1.pdf', 'workout_date' => '2024-12-01']),
            new Workout(['file_name' => 'March.pdf', 'workout_date' => '2024-03-01']),
            new Workout(['file_name' => 'January.pdf', 'workout_date' => '2024-01-01']),
            new Workout(['file_name' => 'Recent.pdf', 'workout_date' => '2026-02-01']),
            new Workout(['file_name' => 'Old.pdf', 'workout_date' => '2019-12-01']),
        ]);

        $controller = (new ReflectionClass(WorkoutsController::class))->newInstanceWithoutConstructor();
        $sortWorkouts = new \ReflectionMethod($controller, 'sortWorkoutsByDate');
        $archive = $sortWorkouts->invoke($controller, $workouts);

        $this->assertSame([2026, 2024, 2019], array_keys($archive));
        $this->assertSame([12, '03', '01'], array_keys($archive['2024']));
        $this->assertSame(
            ['Workout-1.pdf', 'Workout-2.pdf', 'Workout-10.pdf'],
            array_column($archive['2024']['12'], 'file_name'),
        );
    }
}
