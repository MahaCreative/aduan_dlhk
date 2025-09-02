<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AreaKerja;
use Illuminate\Http\Request;

class RuteKerjaController extends Controller
{
    public function index(Request $request)
    {
        $rute = AreaKerja::withCount('users')->latest()->get();

        return inertia('Auth/RuteKerja/Index', compact('rute'));
    }

    public function create(Request $request)
    {
        $rute = AreaKerja::withCount('users')->latest()->get();
        return inertia('Auth/RuteKerja/Form', compact('rute'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate(
            [
                'nama_wilayah' => 'required|string|min:6',
                'geojson' => 'required|json',
                'kode_warna' => 'required|string',
            ]
        );
        $rute = AreaKerja::create($attr);
        return redirect()->back()->with(['type' => 'success', 'message' => '1 data area kerja berhasil ditambahkan']);
    }

    public function delete(Request $request)
    {
        $area = AreaKerja::find($request->id)->delete();
        return redirect()->back()->with(['type' => 'success', 'message' => '1 data area kerja telah berhasil dihapus']);
    }
}
