<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileInstansiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('profile_instansis')->insert([
            [
                'nama_instansi' => 'dinas lingkungan hidup mamuju',
                'nama_kadis' => 'Dr. Guntur Madjid S.Kom., M.Kom',
                'foto_kadis' => 'image/default_profile.jpg',
                'alamat' => 'jl. dipongoro',
                'logo' => 'image/logo_dlhk.png',
                'lat' => -2.691016885746842,
                'long' => 118.86784243803561,
                'keteragan' => fake()->paragraph(3),
                'sambutan' => fake()->paragraph(),
                'email' => fake()->email(),
                'phone' => fake()->phoneNumber(),
            ]
        ]);
    }
}
