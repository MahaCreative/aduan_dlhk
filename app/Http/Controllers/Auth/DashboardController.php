<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AreaKerja;
use App\Models\JenisPengaduan;
use App\Models\PengaduanMasyarakat;
use App\Models\Petasampah;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role == 'masyarakat') {
            return redirect()->route('home');
        }
        $count = [
            'rute_kerja' => AreaKerja::count(),
            'masyarakat' => User::where('role', 'masyarakat')->count(),
            'petugas' => User::where('role', 'petugas')->count(),
            'peta_sampah' => Petasampah::count(),
            'pengaduan_harian' => PengaduanMasyarakat::whereDate('created_at', '=', now())->count(),
            'pengaduan_bulanan' => PengaduanMasyarakat::whereMonth('created_at', '=', now()->format('m'))->whereYear('created_at', '=', now()->format('Y'))->count(),
            'pengaduan_tahunan' => PengaduanMasyarakat::whereYear('created_at', '=', now()->format('Y'))->count(),
        ];
        $statistik = [
            'jenis_pengaduan' => JenisPengaduan::withCount('pengaduan')->get(),

        ];


        return inertia('Auth/Dashboard/Index', compact('count'));
    }
}
