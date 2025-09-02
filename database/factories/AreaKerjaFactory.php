<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AreaKerja>
 */
class AreaKerjaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $r = rand(1, 255);
        $g = rand(1, 255);
        $b = rand(1, 255);
        return [
            'nama_wilayah' => fake()->city(),
            'kode_warna' => "rgb($r, $g, $b)",
        ];
    }
}
