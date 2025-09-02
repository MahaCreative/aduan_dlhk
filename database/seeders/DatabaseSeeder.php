<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AreaKerja;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::create([
            'nama_lengkap' => 'super admin',
            'nik' => '7306071701980005',
            'tempat_lahir' => 'Makassar',
            'tanggal_lahir' => '1998-01-17',
            'telp' => '082194255717',
            'email' => 'superadmin@gmail.com',

            'password' => bcrypt('password'),
            'role' => 'super admin',
            'avatar' => '/image/default_profile.png',
        ]);
        $this->call([
            ProfileInstansiSeeder::class,
        ]);
    }
}
