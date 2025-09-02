<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Petasampah extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pengaduan()
    {
        return $this->hasMany(PengaduanMasyarakat::class, 'peta_sampah_id');
    }

    public function area()
    {
        return $this->belongsTo(AreaKerja::class, 'area_kerja_id');
    }
}
