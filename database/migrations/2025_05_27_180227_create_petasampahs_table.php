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
        Schema::create('petasampahs', function (Blueprint $table) {
            $table->id();
            $table->string('kd_peta');
            $table->foreignId('area_kerja_id')->constrained('area_kerjas')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('alamat');
            $table->string('lat');
            $table->string('long');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('petasampahs');
    }
};
