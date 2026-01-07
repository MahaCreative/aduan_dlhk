import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Index() {
    const { profile } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        telp: "",
        email: "",
        password: "",
        avatar: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("register-store"), {
            onError: (err) => {
                console.log(err);

                Swal.fire({
                    title: "Error",
                    text: "Gagal melakukan pendaftaran akun",
                    icon: "error",
                });
            },
        });
    };
    return (
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
                {/* logo */}
                <div className="flex items-center mb-8">
                    <img
                        src={"/storage/" + profile.logo}
                        alt={profile.nama_instansi}
                        className="w-16 h-16 mr-2"
                    />
                </div>

                {/* card */}
                <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-center text-primary">
                        Register
                    </h1>
                    <p className="text-center text-primary/70 mt-1 mb-6">
                        Create to your account
                    </p>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-3 items-start">
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="nik"
                                    className="block text-sm font-medium"
                                >
                                    NIK
                                </label>
                                <input
                                    id="nik"
                                    type="number"
                                    name="nik"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            nik: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.nik}
                                </p>
                            </div>

                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="nama_lengkap"
                                    className="block text-sm font-medium"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    id="nama_lengkap"
                                    type="text"
                                    name="nama_lengkap"
                                    value={data.nama_lengkap}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            nama_lengkap: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.nama_lengkap}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="tempat_lahir"
                                    className="block text-sm font-medium"
                                >
                                    Tempat Lahir
                                </label>
                                <input
                                    id="tempat_lahir"
                                    name="tempat_lahir"
                                    value={data.tempat_lahir}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            tempat_lahir: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.tempat_lahir}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 items-start">
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="tanggal_lahir"
                                    className="block text-sm font-medium"
                                >
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_lahir"
                                    name="tanggal_lahir"
                                    value={data.tanggal_lahir}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            tanggal_lahir: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.tanggal_lahir}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="tanggal_lahir"
                                    className="block text-sm font-medium"
                                >
                                    Telp (WA)
                                </label>
                                <input
                                    type="number"
                                    id="telp"
                                    name="telp"
                                    value={data.telp}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            telp: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.telp}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="avatar"
                                    className="block text-sm font-medium"
                                >
                                    Avatar
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            avatar: e.target.files[0],
                                        })
                                    }
                                    required
                                    className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                />
                                <p className="text-red-500 italic text-sm">
                                    {errors.avatar}
                                </p>
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                placeholder="you@example.com"
                            />
                            <p className="text-red-500 italic text-sm">
                                {errors.email}
                            </p>
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                required
                                className="mt-1 w-full rounded-lg border-primary focus:ring-primary focus:border-primary"
                                placeholder="••••••••"
                            />
                            <p className="text-red-500 italic text-sm">
                                {errors.password}
                            </p>
                        </div>

                        {/* forgot password */}
                        {/* <div className="text-right">
                            <Link
                                // href={route("forgot_password")}
                                as="button"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div> */}

                        {/* submit */}
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-green-950 text-white font-semibold hover:opacity-90 transition"
                        >
                            Register Now
                        </button>
                    </form>

                    {/* sign‑up link */}
                    <p className="mt-6 text-center text-sm">
                        Login jika punya akun
                        <Link
                            href={route("login")}
                            type="button"
                            className="font-semibold text-blue-700 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
