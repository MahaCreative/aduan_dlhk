<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile_instansis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_instansi');
            $table->string('nama_kadis');
            $table->string('foto_kadis');
            $table->string('alamat');
            $table->string('logo');
            $table->string('lat');
            $table->string('long');
            $table->longText('keteragan');
            $table->longText('sambutan');
            $table->string('email');
            $table->string('phone');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_instansis');
    }
};
