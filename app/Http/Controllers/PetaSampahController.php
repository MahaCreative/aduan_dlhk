<?php

namespace App\Http\Controllers;

use App\Models\AreaKerja;
use App\Models\Petasampah;
use App\Models\User;
use Illuminate\Http\Request;

class PetaSampahController extends Controller
{
    public function index(Request $request)
    {
        $query = Petasampah::query()->with('user', 'area')->withCount(['pengaduan', 'pengaduan as pengaduan_harian' => function ($q) {
            $q->where('created_at', now());
        }, 'pengaduan as pengaduan_bulanan' => function ($q) {
            $q->whereMonth('created_at', now()->format('M'));
        }, 'pengaduan as pengaduan_tahunan' => function ($q) {
            $q->whereYear('created_at', now()->format('Y'));
        }]);
        if ($request->cari) {
            $query->whereHas('area', function ($q) use ($request) {
                $q->where('nama_wilayah', '=', $request->cari);
            });
        }

        $petaSampah = $query->latest()->get();
        $area = AreaKerja::latest()->get();
        return inertia('Auth/PetaTempatSampah/Index', compact('petaSampah', 'area'));
    }

    public function create(Request $request)
    {
        $area_kerja = AreaKerja::latest()->get();
        $peta = Petasampah::latest()->get();
        return inertia('Auth/PetaTempatSampah/Create', compact('area_kerja', 'peta'));
    }

    public function store(Request $request)
    {

        $request->validate([
            "area_kerja_id" => 'required',
            "nama_area" => 'required',
            "alamat" => 'required',
            "lat" => 'required',
            "long" => 'required',
        ]);
        $kdPeta = 'ps-00' . Petasampah::count() + 1;
        $peta = Petasampah::create([
            'kd_peta' => $kdPeta,
            'area_kerja_id' => $request->area_kerja_id,
            'user_id' => $request->user()->id,
            'alamat' => $request->alamat,
            'lat' => $request->lat,
            'long' => $request->long,
        ]);
    }

    public function delete(Request $request)
    {
        $peta = Petasampah::find($request->id)->delete();
    }

    public function form_report(Request $request)
    {
        $area_kerja = AreaKerja::latest()->get();
        $petugas = User::where('role', 'petugas')->latest()->get();
        return inertia('Auth/PetaTempatSampah/FormReport', compact('area_kerja', 'petugas'));
    }

    public function cetak(Request $request)
    {
        $query = Petasampah::query()->with('user', 'area')->withCount(['pengaduan', 'pengaduan as pengaduan_harian' => function ($q) {
            $q->where('created_at', now());
        }, 'pengaduan as pengaduan_bulanan' => function ($q) {
            $q->whereMonth('created_at', now()->format('M'));
        }, 'pengaduan as pengaduan_tahunan' => function ($q) {
            $q->whereYear('created_at', now()->format('Y'));
        }]);
        if ($request->cari) {
            $query->whereHas('area', function ($q) use ($request) {
                $q->where('nama_wilayah', '=', $request->cari);
            });
        }
        if ($request->petugas) {
            $query->where('user_id', $request->petugas);
        }
        if ($request->area_kerja) {
            $query->where('area_kerja_id', $request->area_kerja);
        }
        if ($request->dari_tanggal) {
            $query->whereDate('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('created_at', '<=', $request->sampai_tanggal);
        }

        $petaSampah = $query->latest()->get();
        return inertia('Auth/PetaTempatSampah/Cetak', compact('petaSampah',));
    }
}
