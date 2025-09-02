<?php

use App\Http\Controllers\AboutMeController;
use App\Http\Controllers\Auth\BeritaController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Auth\GaleryController;
use App\Http\Controllers\Auth\JenisPengaduanController;
use App\Http\Controllers\Auth\PengaduanPelangganController;
use App\Http\Controllers\Auth\PetugasController;
use App\Http\Controllers\Auth\ProfileInstansiController;
use App\Http\Controllers\Auth\RuteKerjaController;
use App\Http\Controllers\AuthControllr;
use App\Http\Controllers\BeritaController as ControllersBeritaController;
use App\Http\Controllers\GaleryController as ControllersGaleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LayananAduanController;
use App\Http\Controllers\PetaSampahController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileSayaController;
use App\Models\Berita;
use App\Models\Galery;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', [AuthControllr::class, 'login'])->name('login');
Route::post('login', [AuthControllr::class, 'login_store'])->name('login');
Route::get('register', [AuthControllr::class, 'register'])->name('register');
Route::post('register-store', [AuthControllr::class, 'register_store'])->name('register-store');

Route::get('berita', [ControllersBeritaController::class, 'index'])->name('berita');
Route::get('berita/{slug}', [ControllersBeritaController::class, 'show'])->name('detail-berita');
Route::get('galery', [ControllersGaleryController::class, 'index'])->name('galery');
Route::get('galery/{slug}', [ControllersGaleryController::class, 'show'])->name('detail-galery');
Route::get('about-me', [AboutMeController::class, 'index'])->name('about_me');

Route::get('layanan-aduan', [LayananAduanController::class, 'index'])->name('layanan-aduan');
Route::post('store-layanan-aduan', [LayananAduanController::class, 'store'])->name('store-layanan-aduan');
Route::get('history-aduan', [LayananAduanController::class, 'history'])->name('history-aduan');
Route::get('detail-history-aduan/{kd_pengaduan}', [LayananAduanController::class, 'detail'])->name('detail-history-pengaduan');
Route::get('profile-saya', [ProfileSayaController::class, 'index'])->name('profile-saya');
Route::get('', [HomeController::class, 'index'])->name('home');


Route::middleware('auth')->group(function () {
    ROute::get('logout', [AuthControllr::class, 'logout'])->name('logout');

    Route::get('auth/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('auth/kelola-rute-kerja', [RuteKerjaController::class, 'index'])->name('auth.kelola-rute-kerja');
    Route::get('auth/create-rute-kerja', [RuteKerjaController::class, 'create'])->name('auth.create-rute-kerja');
    Route::post('auth/store-rute-kerja', [RuteKerjaController::class, 'store'])->name('auth.store-rute-kerja');
    Route::delete('auth/delete-rute-kerja', [RuteKerjaController::class, 'delete'])->name('auth.delete-rute-kerja');

    Route::get('auth/kelola-petugas', [PetugasController::class, 'index'])->name('auth.kelola-petugas');
    Route::post('auth/store-petugas', [PetugasController::class, 'store'])->name('auth.store-petugas');
    Route::delete('auth/delete-petugas', [PetugasController::class, 'delete'])->name('auth.delete-petugas');

    Route::get('auth/kelola-jenis-pengaduan', [JenisPengaduanController::class, 'index'])->name('auth.kelola-jenis-pengaduan');
    Route::post('auth/store-jenis-pengaduan', [JenisPengaduanController::class, 'store'])->name('auth.store-jenis-pengaduan');
    Route::post('auth/update-jenis-pengaduan', [JenisPengaduanController::class, 'update'])->name('auth.update-jenis-pengaduan');
    Route::delete('auth/delete-jenis-pengaduan', [JenisPengaduanController::class, 'delete'])->name('auth.delete-jenis-pengaduan');

    Route::get('auth/kelola-profile-instansi', [ProfileInstansiController::class, 'index'])->name('auth.kelola-profile-instansi');
    Route::post('auth/update-profile-instansi', [ProfileInstansiController::class, 'update'])->name('auth.update-profile-instansi');

    Route::get('auth/kelola-berita', [BeritaController::class, 'index'])->name('auth.kelola-berita');
    Route::get('auth/create-kelola-berita', [BeritaController::class, 'create'])->name('auth.create-kelola-berita');
    Route::post('auth/store-kelola-berita', [BeritaController::class, 'store'])->name('auth.store-kelola-berita');
    Route::get('auth/edit-kelola-berita/{slug}', [BeritaController::class, 'edit'])->name('auth.edit-kelola-berita');
    Route::post('auth/update-kelola-berita/{slug}', [BeritaController::class, 'update'])->name('auth.update-kelola-berita');
    Route::delete('auth/delete-kelola-berita/{slug}', [BeritaController::class, 'delete'])->name('auth.delete-kelola-berita');

    Route::get('auth/kelola-galery', [GaleryController::class, 'index'])->name('auth.kelola-galery');
    Route::get('auth/create-kelola-galery', [GaleryController::class, 'create'])->name('auth.create-kelola-galery');
    Route::post('auth/store-kelola-galery', [GaleryController::class, 'store'])->name('auth.store-kelola-galery');
    Route::get('auth/edit-kelola-galery/{slug}', [GaleryController::class, 'edit'])->name('auth.edit-kelola-galery');
    Route::post('auth/update-kelola-galery/{slug}', [GaleryController::class, 'update'])->name('auth.update-kelola-galery');
    Route::delete('auth/delete-kelola-galery/{slug}', [GaleryController::class, 'delete'])->name('auth.delete-kelola-galery');

    Route::get('auth/kelola-peta-tempat-sampah', [PetaSampahController::class, 'index'])->name('auth.kelola-peta-tempat-sampah');
    Route::get('auth/create-peta-tempat-sampah', [PetaSampahController::class, 'create'])->name('auth.create-peta-tempat-sampah');
    Route::post('auth/store-peta-tempat-sampah', [PetaSampahController::class, 'store'])->name('auth.store-peta-tempat-sampah');
    Route::delete('auth/delete-peta-tempat-sampah', [PetaSampahController::class, 'delete'])->name('auth.delete-peta-tempat-sampah');
    Route::get('laporan-peta-tempat-sampah', [PetaSampahController::class, 'form_report'])->name('form_report_peta_tempat_sampah');
    Route::get('cetak-laporan-peta-tempat-sampah', [PetaSampahController::class, 'cetak'])->name('cetak_peta_tempat_sampah');

    Route::get('auth/pengaduan-pelanggan', [PengaduanPelangganController::class, 'index'])->name('auth.kelola-pengaduan');
    Route::get('auth/detail-pengaduan-pelanggan/{kd_pengdauan}', [PengaduanPelangganController::class, 'show'])->name('auth.detail-pengaduan');
    Route::post('auth/proses-pengaduan-pelanggan/{kd_pengdauan}', [PengaduanPelangganController::class, 'proses'])->name('auth.proses-pengaduan');

    Route::get('laporan-pengaduan', [PengaduanPelangganController::class, 'form_report'])->name('form_report_pegaduan');
    Route::get('cetak-laporan-pengaduan', [PengaduanPelangganController::class, 'cetak_laporan'])->name('cetak_laporan_pengaduan');
});
