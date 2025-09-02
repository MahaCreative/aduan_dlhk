<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AreaKerja;
use App\Models\JenisPengaduan;
use App\Models\PengaduanMasyarakat;
use App\Models\User;
use Illuminate\Http\Request;

class PengaduanPelangganController extends Controller
{
    public function index(Request $request)
    {
        $query = PengaduanMasyarakat::query()->with('jenis_pengaduan', 'petugas', 'area');
        $user = User::with('areaKerja')->where('id', $request->user()->id)->first();
        $nama_wilayah = [];
        foreach ($user->areaKerja as $key => $item) {
            $nama_wilayah[$key] = $item->nama_wilayah;
        }

        $area_kerja = AreaKerja::whereIn('nama_wilayah', $nama_wilayah)->latest()->get();

        $pengaduan = $query
            ->latest()
            ->get();

        return inertia('Auth/Pengaduan/Index', compact('pengaduan', 'area_kerja'));
    }

    public function show(Request $request, $kd_pengaduan)
    {
        $pengaduan = PengaduanMasyarakat::with('jenis_pengaduan', 'petugas', 'area')->where('kd_pengaduan', $kd_pengaduan)->first();
        return inertia('Auth/Pengaduan/Detail', compact('pengaduan'));
    }

    public function proses(Request $request, $kd_pengaduan)
    {
        $pengaduan = PengaduanMasyarakat::with('jenis_pengaduan', 'petugas', 'area')->where('kd_pengaduan', $kd_pengaduan)->first();
        $foto_penanganan = $pengaduan->foto_penanganan;
        if ($pengaduan->foto_penanganan == null) {
            $request->validate(['foto_penanganan' => 'required']);
        }
        $request->validate([
            'tanggal_penanganan' => 'required|date',
            'status_pengaduan' => 'required',
            'status_lapangan' => 'required',
            'solusi_pengangan' => 'required|string|min:6|max:255',
            'foto_penanganan' => 'nullable|mimes:png,jpeg,jpg',
        ]);
        if ($request->hasFile('foto_penanganan')) {
            $request->validate(['foto_penanganan' => 'required']);
            $foto_penanganan = $request->file('foto_penanganan')->store('foto_penanganan');
        }
        $pengaduan->update([
            'petugas_id' => $request->user()->id,
            'tanggal_proses' => now(),
            'status_pengaduan' => $request->status_pengaduan,
            'status_lapangan' => $request->status_lapangan,
            'solusi_pengangan' => $request->solusi_pengangan,
            'foto_penanganan' => $foto_penanganan,
        ]);
    }

    public function form_report(Request $request)
    {
        $jenis_pengaduan = JenisPengaduan::latest()->get();
        $area_kerja = AreaKerja::latest()->get();

        return inertia('Auth/Pengaduan/FormReport', compact('jenis_pengaduan', 'area_kerja'));
    }

    public function cetak_laporan(Request $request)
    {
        $query = PengaduanMasyarakat::query()->with('jenis_pengaduan', 'petugas', 'area');
        if ($request->jenis_pengaduan) {
            $query->where('jenis_pengaduan_id', $request->jenis_pengaduan_id);
        }
        if ($request->area_kerja) {
            $query->where('area_kerja_id', $request->area_kerja);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->dari_tanggal) {
            $query->whereDate('created_at', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('created_at', '<=', $request->sampai_tanggal);
        }
        $pengaduan = $query->latest()->get();
        return inertia('Auth/Pengaduan/Cetak', compact('pengaduan'));
    }
}
