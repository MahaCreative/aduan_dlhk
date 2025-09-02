<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthControllr extends Controller
{
    public function login(Request $request)
    {
        return inertia('Guest/Login/Index');
    }

    public function login_store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function register(Request $request)
    {
        return inertia('Guest/Login/Register');
    }

    public function register_store(Request $request)
    {


        $request->validate([
            'nama_lengkap'   => 'required|string|max:255',
            'nik'            => 'required|min_digits:6|unique:users,nik',
            'tempat_lahir'   => 'required|string|max:100',
            'tanggal_lahir'  => 'required|date',
            'email'          => 'required|email|unique:users,email',
            'telp'          => 'required|numeric|unique:users,telp|digits:12',
            'password'       => 'required|string|min:6',
            'avatar'         => 'required|image|mimes:jpg,jpeg,png|max:2048',
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
            'role' => 'masyarakat',
            'avatar' => $image,
        ]);
        Auth::login($user);
        return redirect()->route('dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('login');
    }
    public function send_wa($phone,)
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
                'message' => "
Selamat datang di sistem informasi layanan aduan Dinas Lingkungan Hidup Mamuju

Untuk dapat login silahkan masukkan OTP dibawah ini 


Jangan perlihatkan kode ini pada siapapun
                ",
                'location' => '-7.983908, 112.621391',
                'delay' => '2',

                // 'location' => '-7.983908, 112.621391',

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
