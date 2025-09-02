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
        Schema::create('pengaduan_masyarakats', function (Blueprint $table) {
            $table->id();

            $table->string('kd_pengaduan');
            $table->foreignId('peta_sampah_id')->nullable();
            $table->foreignId('area_kerja_id')->constrained('area_kerjas')->onDelete('cascade');
            $table->foreignId('jenis_pengaduan_id')->constrained('jenis_pengaduans')->onDelete('cascade');
            $table->foreignId('pelanggan_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->nullable();
            $table->string('judul_pengaduan');
            $table->string('nama_pelapor');
            $table->string('telph');
            $table->longText('deskripsi_pengaduan');
            $table->string('status_lapangan')->default('menunggu pengecekan');
            $table->string('status_pengaduan')->default('menunggu konfirmasi');
            $table->date('tanggal_proses')->nullable();
            $table->string('solusi_pengangan')->nullable();
            $table->string('foto_penanganan')->nullable();
            $table->string('foto_pengaduan');
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
        Schema::dropIfExists('pengaduan_masyarakats');
    }
};
