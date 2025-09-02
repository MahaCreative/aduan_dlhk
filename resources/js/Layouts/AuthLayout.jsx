import { Link, usePage } from "@inertiajs/react";
import { Menu } from "@mui/icons-material";
import React, { useState } from "react";

export default function AuthLayout({ children }) {
    const [open, setOpen] = useState(false);
    const { auth, profile } = usePage().props;

    return (
        <div className="w-full ">
            <div className="w-full bg-primary px-4 md:px-8 lg:px-16">
                <div className="flex flex-row gap-x-2 items-center py-3 leading-3">
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-white text-4xl mr-5"
                    >
                        <Menu color="inherit" fontSize="inherit" />
                    </button>
                    <img
                        src={"/storage/" + profile.logo}
                        alt=""
                        className="w-12 h-12"
                    />
                    <h1 className="font-bold text-white uppercase">
                        {profile.nama_instansi}
                    </h1>
                </div>
            </div>
            <div className="w-full flex flex-row gap-x-2 items-start h-[89.4vh] ">
                {/* sidebar */}
                <div
                    className={`${
                        open ? "w-[110%] md:w-[50%] lg:w-[30%]" : "w-0"
                    } overflow-x-hidden bg-primary  h-full transition-all duration-300 ease-in-out`}
                >
                    <div
                        className={`${
                            open == false && "opacity-0"
                        } flex flex-col  px-4 pt-3 border-b border-secondary/50  transition-all duration-300 ease-in-out`}
                    >
                        <p className="text-xs md:text-sm lg:text-base text-white font-light tracking-tight leading-5">
                            Selamat Datang
                        </p>
                        <p className="text-xs md:text-sm lg:text-base text-white font-light tracking-tight leading-5">
                            Sistem Informasi Layanan Pengaduan
                        </p>
                        <h1 className="font-bold text-secondary text-lg md:text-xl lg:text-2xl ">
                            DLHK MAMUJU
                        </h1>
                    </div>
                    <div className="px-4 py-2 w-full">
                        <h1 className="text-secondary font-bold my-1.5 text-sm md:text-base">
                            Master Data
                        </h1>
                        <Link
                            href={route("home")}
                            as="button"
                            className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                route().current("home")
                                    ? "bg-white text-primary"
                                    : ""
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            href={route("dashboard")}
                            as="button"
                            className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                route().current("dashboard")
                                    ? "bg-white text-primary"
                                    : ""
                            }`}
                        >
                            Dashboard
                        </Link>
                        {auth.user.role == "super admin" && (
                            <>
                                <Link
                                    href={route("auth.kelola-rute-kerja")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current(
                                            "auth.kelola-rute-kerja"
                                        )
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Rute Kerja
                                </Link>
                                <Link
                                    href={route("auth.kelola-petugas")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current("auth.kelola-petugas")
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Petugas
                                </Link>
                                <Link
                                    href={route("auth.kelola-jenis-pengaduan")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current(
                                            "auth.kelola-jenis-pengaduan"
                                        )
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Jenis Pengaduan
                                </Link>
                            </>
                        )}
                        {auth.user.role == "petugas" && (
                            <>
                                <Link
                                    href={route(
                                        "auth.kelola-peta-tempat-sampah"
                                    )}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current(
                                            "auth.kelola-peta-tempat-sampah"
                                        )
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Peta Tempat Sampah
                                </Link>
                                <Link
                                    href={route("auth.kelola-pengaduan")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current("auth.kelola-pengaduan")
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Pengaduan Masyarakat
                                </Link>
                            </>
                        )}
                        <h1 className="text-secondary font-bold my-1.5 text-sm md:text-base">
                            Informasi Umum
                        </h1>
                        {auth.user.role == "super admin" && (
                            <Link
                                href={route("auth.kelola-profile-instansi")}
                                as="button"
                                className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                    route().current(
                                        "auth.kelola-profile-instansi"
                                    )
                                        ? "bg-white text-primary"
                                        : ""
                                }`}
                            >
                                Kelola Profile Instansi
                            </Link>
                        )}
                        {auth.user.role == "petugas" && (
                            <>
                                <Link
                                    href={route("auth.kelola-berita")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current("auth.kelola-berita")
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Berita
                                </Link>
                                <Link
                                    href={route("auth.kelola-galery")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current("kelola-galery")
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Kelola Galery
                                </Link>
                            </>
                        )}
                        {auth.user.role == "super admin" && (
                            <>
                                <h1 className="text-secondary font-bold my-1.5 text-sm md:text-base">
                                    Laporan
                                </h1>
                                <Link
                                    href={route("form_report_pegaduan")}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current("form_report_pegaduan")
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Laporan Pengaduan
                                </Link>
                                <Link
                                    href={route(
                                        "form_report_peta_tempat_sampah"
                                    )}
                                    as="button"
                                    className={`w-full my-1 hover:bg-white bg-secondary text-left px-4 py-1 rounded-md font-semibold text-xs md:text-sm ${
                                        route().current(
                                            "form_report_peta_tempat_sampah"
                                        )
                                            ? "bg-white text-primary"
                                            : ""
                                    }`}
                                >
                                    Laporan Titik Tempat Sampah
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                {/* end sidebar */}
                <div className="w-full max-h-[100%] overflow-y-auto ">
                    {children}
                </div>
            </div>
        </div>
    );
}
