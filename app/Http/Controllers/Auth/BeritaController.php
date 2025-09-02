<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query()->with('user');

        $berita = $query->latest()->get();
        return inertia('Auth/Berita/Index', compact('berita'));
    }

    public function create(Request $request)
    {
        return inertia('Auth/Berita/Create');
    }

    public function store(Request $request)
    {
        $userId = 1;
        $request->validate([
            'judul_berita' => "required|string|min:6|max:255",
            'thumbnail' => "required|image|mimes:jpg,jpeg,png,webp,avif",
            'kontent' => "required|string|min:25",
        ]);
        $slug = \Str::slug($request->judul_berita);
        $thumbnail = $request->file('thumbnail')->store('thumbnail');
        $berita = Berita::create([
            'judul_berita' => $request->judul_berita,
            'slug' => $slug,
            'thumbnail' => $thumbnail,
            'kontent' => $request->kontent,
            'user_id' => $userId,
            'views' => 0,
        ]);
    }
    public function edit(Request $request, $slug)
    {
        $berita = Berita::where('slug', $slug)->first();
        return inertia('Auth/Berita/Create', compact('berita'));
    }

    public function update(Request $request, $slug)
    {
        $berita = Berita::where('slug', $slug)->first();
        $request->validate([
            'judul_berita' => "required|string|min:6|max:255",
            'thumbnail' => "nullable|image|mimes:jpg,jpeg,png,webp,avif",
            'kontent' => "required|string|min:25",
        ]);
        $thumbnail = $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnail') :  $berita->thumbnail;
        $berita->update([
            'judul_berita' => $request->judul_berita,
            'thumbnail' => $thumbnail,
            'kontent' => $request->kontent,

        ]);
    }
    public function delete(Request $request, $slug)
    {
        $berita = Berita::where('slug', $slug)->first()->delete();
    }
}
