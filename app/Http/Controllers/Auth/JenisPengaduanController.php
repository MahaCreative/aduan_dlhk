<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\JenisPengaduan;
use Illuminate\Http\Request;

class JenisPengaduanController extends Controller
{
    public function index(Request $request)
    {
        $jenis = JenisPengaduan::withCount(['pengaduan', 'pengaduan as pengaduan_harian' => function ($q) {
            $q->where('created_at', now());
        }, 'pengaduan as pengaduan_bulanan' => function ($q) {
            $q->whereMonth('created_at', now()->format('M'));
        }, 'pengaduan as pengaduan_tahunan' => function ($q) {
            $q->whereYear('created_at', now()->format('Y'));
        }])->latest()->get();

        return inertia('Auth/JenisPengaduan/Index', compact('jenis'));
    }

    public function store(Request $request)
    {
        $request->validate(['nama' => 'required|string|min:6|max:75|unique:jenis_pengaduans,nama']);
        $jenis = JenisPengaduan::create(['nama' => $request->nama]);
    }
    public function update(Request $request)
    {
        $jenis = JenisPengaduan::find($request->id);
        $request->validate(['nama' => 'required|string|min:6|max:75|unique:jenis_pengaduans,nama']);
        $jenis->update(['nama' => $request->nama]);
    }

    public function delete(Request $request)
    {
        $jenis = JenisPengaduan::find($request->id)->delete();
    }
}
