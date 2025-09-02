<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Galery;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $berita = Berita::with('user')->latest()->get()->take(9);
        $galery = Galery::with('user')->latest()->get()->take(9);
        return inertia('Guest/Home/Index', compact('berita', 'galery'));
    }
}
