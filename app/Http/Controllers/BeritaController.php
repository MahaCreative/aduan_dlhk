<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galery;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query()->with('user');

        if ($request->cari) {
            $query->where('judul_berita', 'like', '%' . $request->cari . '%');
        }
        $berita = $query->latest()->get();

        return inertia('Guest/Berita/Index', compact('berita'));
    }

    public function show(Request $request, $slug)
    {
        $berita = Berita::with('user')->where('slug', $slug)->first();
        $galery = Galery::with('user')->latest()->get()->take(10);
        return inertia('Guest/Berita/Show', compact('galery', 'berita'));
    }
}
