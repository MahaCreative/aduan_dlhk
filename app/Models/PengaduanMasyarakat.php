<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengaduanMasyarakat extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function area()
    {
        return $this->belongsTo(AreaKerja::class, 'area_kerja_id');
    }
    public function petugas()
    {
        return $this->belongsTo(User::class);
    }
    public function jenis_pengaduan()
    {
        return $this->belongsTo(JenisPengaduan::class);
    }
}
