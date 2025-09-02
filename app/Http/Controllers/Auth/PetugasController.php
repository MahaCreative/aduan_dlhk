<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->where('role', 'petugas')->with('areaKerja');
        if ($request->cari) {
            $query->where('nama_lengkap', 'like', '%' . $request->cari . '%')
                ->orWhere('nik', 'like', '%' . $request->cari . '%');
        }
        if ($request->area_kerja) {
            $query->whereHas('areaKerja', function ($q) use ($request) {
                $q->where('nama_wilayah', $request->area_kerja);
            });
        }
        $petugas = $query->latest()->get();

        return inertia('Auth/Petugas/Index', compact('petugas'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap'   => 'required|string|max:255',
            'nik'            => 'required|numeric|min_digits:6|unique:users,nik',
            'tempat_lahir'   => 'required|string|max:100',
            'tanggal_lahir'  => 'required|date',
            'email'          => 'required|email|unique:users,email',
            'telp'          => 'required|numeric|unique:users,telp|digits:12',
            'password'       => 'required|string|min:8',
            'avatar'         => 'required|image|mimes:jpg,jpeg,png|max:2048',
            // 'area_kerja_id'  => 'required|array|min:1',
            'area_kerja_id.*' => 'numeric|exists:area_kerjas,id',
        ]);
        $image = $request->file('avatar')->store('user');
        $user = User::create([
            'nama_lengkap' => $request->nama_lengkap,
            'nik' => $request->nik,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'email' => $request->email,
            'telp' => $request->telp,
            'password' => bcrypt($request->password),
            'role' => 'petugas',
            'avatar' => $image,
        ]);
        $user->areaKerja()->sync($request->area_kerja_id); // untuk menyimpan relasi many-to-many
    }

    public function delete(Request $request)
    {
        $petugas = User::find($request->id)->delete();
    }
}
