<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ProfileInstansi;
use Illuminate\Http\Request;

class ProfileInstansiController extends Controller
{
    public function index(Request $request)
    {
        $profileInstansi = ProfileInstansi::first();

        return inertia('Auth/ProfileInstansi/Index', compact('profileInstansi'));
    }

    public function update(Request $request)
    {

        $request->validate([
            'nama_instansi' => 'required|string|min:6',
            'nama_kadis' => 'required|string|min:12',
            'foto_kadis' => 'required|image|mimes:jpeg,jpg,png',
            'alamat' => 'required|string|min:3|max:255',
            'logo' => 'required|image|mimes:jpeg,jpg,png',
            'lat' => 'required',
            'long' => 'required',
            'keteragan' => 'required|string|min:25',
            'sambutan' => 'required|string|min:25',
            'email' => 'required|email',
            'phone' => 'required|numeric|digits:12',
        ]);
        $logo = $request->file('logo')->store('logo');
        $foto_kadis = $request->file('foto_kadis')->store('foto_kadis');
        $profile = ProfileInstansi::first();
        $profile->update([
            'nama_instansi' => $request->nama_instansi,
            'nama_kadis' => $request->nama_kadis,
            'foto_kadis' => $foto_kadis,
            'alamat' => $request->alamat,
            'logo' => $logo,
            'lat' => $request->lat,
            'long' => $request->long,
            'keteragan' => $request->keteragan,
            'sambutan' => $request->sambutan,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);
    }
}
