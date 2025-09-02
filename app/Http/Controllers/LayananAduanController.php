<?php

namespace App\Http\Controllers;

use App\Models\AreaKerja;
use App\Models\JenisPengaduan;
use App\Models\PengaduanMasyarakat;
use App\Models\Petasampah;
use App\Models\PetugasWilayahKerja;
use App\Models\User;
use Illuminate\Http\Request;

class LayananAduanController extends Controller
{
    public function index(Request $request)
    {
        $wilayah = AreaKerja::latest()->get();
        $jenisPengaduan = JenisPengaduan::latest()->get();
        $peta = Petasampah::with('area')->latest()->get();
        return inertia('Guest/LayananAduan/Create', compact('jenisPengaduan', 'wilayah', 'peta'));
    }

    public function store(Request $request)
    {


        $request->validate([
            "area_kerja_id" => "required",
            "nama_pelapor" => "required",
            "judul_pengaduan" => "required",
            "deskripsi_pengaduan" => "required",
            "foto_pengaduan" => "required|image|mimes:jpg,jpeg,png",
            "telph" => "required",
            "jenis_pengaduan_id" => "required",
            "jenis_pengaduan" => "required",
            "wilayah" => "required",
            "lat" => "required",
            "long" => "required",
        ]);

        $kd_pengaduan = '00' . PengaduanMasyarakat::count() + 1;
        $foto_pengaduan = $request->file('foto_pengaduan')->store('foto_pengaduan');
        $jenis = JenisPengaduan::where('id', $request->jenis_pengaduan_id)->first();
        $pengaduan = PengaduanMasyarakat::create([
            'kd_pengaduan' => $kd_pengaduan,
            'area_kerja_id' => $request->area_kerja_id,
            'nama_pelapor' => $request->nama_pelapor,
            'telph' => $request->telph,
            'peta_sampah_id' => $request->peta_sampah_id ? $request->peta_sampah_id : null,
            'jenis_pengaduan_id' => $request->jenis_pengaduan_id,
            'pelanggan_id' =>  $request->user()->id,
            'judul_pengaduan' => $request->judul_pengaduan,
            'deskripsi_pengaduan' => $request->deskripsi_pengaduan,
            'foto_pengaduan' => $foto_pengaduan,
            'lat' => $request->lat,
            'long' => $request->long,
        ]);
        $petugas = AreaKerja::with('users')->where('id', $request->area_kerja_id)->first();
        foreach ($petugas->users as $item) {

            $this->sending_message($pengaduan, $jenis, $item->telp);
            $this->location_mesasage($pengaduan,  $item->telp);
        }
    }

    public function history(Request $request)
    {

        $pengaduan = PengaduanMasyarakat::with('jenis_pengaduan', 'petugas', 'area')->where('pelanggan_id', $request->user()->id)->latest()->get();
        return inertia('Guest/HistoryPengaduan/HistoryPengaduan', compact('pengaduan'));
    }

    public function detail(Request $request, $kd_pengaduan)
    {
        $pengaduan = PengaduanMasyarakat::with('jenis_pengaduan', 'petugas', 'area')->where('kd_pengaduan', $kd_pengaduan)->first();
        return inertia('Guest/HistoryPengaduan/Detail', compact('pengaduan'));
    }

    public function sending_message($pengaduan, $jenis, $phone)
    {

        $url = route("auth.proses-pengaduan", $pengaduan->kd_pengaduan);
        $message = "Halo petugas, Ada pengaduan baru yang dilaporkan oleh masyarakat nih tolong diprospek yah. \n\n Jenis Pengaduan \t : $jenis->nama \n Judul Pengaduan \t : $pengaduan->judul_pengaduan
        \nNama Pelapor \t: $pengaduan->nama_pelapor 
        \nTelp Pelapor \t: $pengaduan->telph
        \nSilahkan konfirmasi pengaduan terlebih dahulu untuk memastikan kebenaran aduan yang dilakukan
        \nJika pengaduan benar adanya silahkan proses pengaduan melalui Link berikut:
        \n$url
        ";
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $phone,
                'message' => $message,
                'schedule' => 0,
                'typing' => false,
                'delay' => '2',
                'countryCode' => '62',
                // 'file' => new CURLFile("localfile.jpg"),

                'followup' => 0,
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: oAMf+vjnQeV9gmqAGRb8'
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
            echo $error_msg;
        }
        echo $response;
    }
    public function location_mesasage($pengaduan, $phone)
    {


        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $phone,

                'filename' => 'filename',
                'schedule' => 0,
                'typing' => false,
                'delay' => '2',
                'countryCode' => '62',
                // 'file' => new CURLFile("localfile.jpg"),
                'location' => " $pengaduan->lat , $pengaduan->long",
                'followup' => 0,
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: oAMf+vjnQeV9gmqAGRb8'
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
            echo $error_msg;
        }
        echo $response;
    }
}
