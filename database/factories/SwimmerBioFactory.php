<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SwimmerBio>
 */
class SwimmerBioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'swimmer_name' => fake()->name(),
            'image_cdn' => fake()->imageUrl(),
            'body' => fake()->paragraph(),
        ];
    }
}
