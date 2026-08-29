<?php

namespace Database\Factories;

use App\Models\SwimmerBio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SwimmerBio>
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
            'image_cdn' => fake()->imageUrl(category: 'animals'),
            'body' => fake()->paragraph(),
        ];
    }
}
