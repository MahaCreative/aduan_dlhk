<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::query()->with('user');

        if ($request->cari) {
            $query->where('judul_berita', 'like', '%' . $request->cari . '%');
        }
        $galery = $query->latest()->get();

        return inertia('Guest/Galery/Index', compact('galery'));
    }

    public function show(Request $request, $slug)
    {
        $galery = Galery::with('user')->where('slug', $slug)->first();
        $berita = Berita::with('user')->latest()->get()->take(10);
        return inertia('Guest/Galery/Show', compact('galery', 'berita'));
    }
}
