<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::query()->with('user');

        $galery = $query->latest()->get();
        return inertia('Auth/Galery/Index', compact('galery'));
    }

    public function create(Request $request)
    {
        return inertia('Auth/Galery/Create');
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
        $galery = Galery::create([
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
        $galery = Galery::where('slug', $slug)->first();
        return inertia('Auth/Galery/Create', compact('galery'));
    }

    public function update(Request $request, $slug)
    {
        $galery = Galery::where('slug', $slug)->first();
        $request->validate([
            'judul_berita' => "required|string|min:6|max:255",
            'thumbnail' => "nullable|image|mimes:jpg,jpeg,png,webp,avif",
            'kontent' => "required|string|min:25",
        ]);
        $thumbnail = $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnail') :  $galery->thumbnail;
        $galery->update([
            'judul_berita' => $request->judul_berita,
            'thumbnail' => $thumbnail,
            'kontent' => $request->kontent,

        ]);
    }
    public function delete(Request $request, $slug)
    {
        $galery = Galery::where('slug', $slug)->first()->delete();
    }
}
