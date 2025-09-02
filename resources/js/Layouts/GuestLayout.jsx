import Maps from "@/Components/Maps";
import { Link, usePage } from "@inertiajs/react";
import {
    CalendarMonth,
    Close,
    Email,
    Face,
    LocationCity,
    Menu,
    Phone,
} from "@mui/icons-material";
import moment from "moment";
import React, { useState } from "react";
import { Marker } from "react-leaflet";

export default function GuestLayout({ children, props }) {
    const { profile, auth } = usePage().props;
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex flex-row justify-between items-center px-4 md:px-8 lg:px-16 bg-primary">
                <div className="flex gap-x-3 items-center py-3">
                    <img
                        src={"/storage/" + profile.logo}
                        alt=""
                        className="w-12 "
                    />

                    <h1 className="font-nunito font-bold text-2xl tracking-tighter text-secondary capitalize">
                        {profile.nama_instansi}
                    </h1>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="block md:hidden hover:bg-white hover:text-primary text-white py-2 px-3 rounded-md"
                >
                    {open ? (
                        <Close fontSize="large" color="inherit" />
                    ) : (
                        <Menu fontSize="large" color="inherit" />
                    )}
                </button>
                <div className="hidden md:block ">
                    <Link
                        href={route("home")}
                        className={`${
                            route().current("home")
                                ? "bg-white text-primary"
                                : "text-white"
                        }  mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                    >
                        Home
                    </Link>
                    <Link
                        href={route("about_me")}
                        className={`${
                            route().current("about_me")
                                ? "bg-white text-primary"
                                : "text-white"
                        } mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                    >
                        Profile Kantor
                    </Link>

                    <Link
                        href={route("galery")}
                        className={`${
                            route().current("galery") ||
                            route().current("detail-galery")
                                ? "bg-white text-primary"
                                : "text-white"
                        } mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                    >
                        Galery
                    </Link>
                    <Link
                        href={route("berita")}
                        className={`${
                            route().current("berita") ||
                            route().current("detail-berita")
                                ? "bg-white text-primary"
                                : "text-white"
                        } mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                    >
                        Berita
                    </Link>
                    <Link
                        href={route("layanan-aduan")}
                        className={`${
                            route().current("layanan-aduan")
                                ? "bg-white text-primary"
                                : ""
                        } font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                    >
                        Layanan Aduan
                    </Link>
                    {auth.user ? (
                        <>
                            {auth.user.role !== "masyarakat" && (
                                <Link
                                    href={route("dashboard")}
                                    className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {auth.user.role == "masyarakat" && (
                                <>
                                    <Link
                                        href={route("history-aduan")}
                                        className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                                    >
                                        History Pengaduan
                                    </Link>
                                    <Link
                                        href={route("profile-saya")}
                                        className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                                    >
                                        Profile
                                    </Link>
                                </>
                            )}
                            <Link
                                href={route("logout")}
                                className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link
                            href={route("login")}
                            className="font-medium bg-blue-600  text-white hover:bg-blue-500 py-2 px-3 rounded-md hover:text-white"
                        >
                            Login / Register
                        </Link>
                    )}
                </div>
            </div>
            <div
                className={`md:hidden ${
                    open ? "flex" : "hidden"
                } flex-wrap justify-center items-center bg-primary py-4`}
            >
                <button
                    onClick={() => setOpen(false)}
                    className="hover:bg-white hover:text-primary text-white py-2 px-3 rounded-md text-sm font-medium"
                >
                    <Close fontSize="inherit" color="inherit" />
                    <span>Close Menu</span>
                </button>
                <Link
                    href={route("home")}
                    className={`${
                        route().current("home")
                            ? "bg-white text-primary"
                            : "text-white"
                    }  mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Home
                </Link>
                <Link
                    href={route("about_me")}
                    className={`${
                        route().current("about_me")
                            ? "bg-white text-primary"
                            : "text-white"
                    } mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Profil Kantor
                </Link>
                <Link
                    className={` font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Kontak Kami
                </Link>
                <Link
                    href={route("galery")}
                    className={`${
                        route().current("galery") ||
                        route().current("detail-galery")
                            ? "bg-white text-primary"
                            : "text-white"
                    } mx-1 font-medium   hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Galery
                </Link>
                <Link
                    href={route("berita")}
                    className={`${
                        route().current("berita") ||
                        route().current("detail-berita")
                            ? "bg-white text-primary"
                            : ""
                    } font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Berita
                </Link>
                <Link
                    href={route("layanan-aduan")}
                    className={`${
                        route().current("layanan-aduan")
                            ? "bg-white text-primary"
                            : ""
                    } font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm`}
                >
                    Layanan Aduan
                </Link>
                {auth.user ? (
                    <>
                        {auth.user.role !== "masyarakat" && (
                            <Link
                                href={route("dashboard")}
                                className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                            >
                                Dashboard
                            </Link>
                        )}
                        {auth.user.role == "masyarakat" && (
                            <>
                                <Link
                                    href={route("history-aduan")}
                                    className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                                >
                                    History Pengaduan
                                </Link>
                                <Link
                                    href={route("profile-saya")}
                                    className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                        <Link
                            href={route("logout")}
                            className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm"
                        >
                            Logout
                        </Link>
                    </>
                ) : (
                    <Link
                        href={route("login")}
                        className="font-medium bg-blue-600  text-white hover:bg-blue-500 py-2 px-3 rounded-md hover:text-white"
                    >
                        Login / Register
                    </Link>
                )}
            </div>

            {children}
            {/* <div className="bg-primary min-h-[300px] py-8 px-4 md:px-8 lg:px-16 bg-[url('/storage/image/background2.png')] bg-[contain] bg-left-bottom bg-no-repeat ">
                <h1 className="text-secondary text-center font-bold text-2xl">
                    Contact Me
                </h1>
                <div className="flex gap-x-8 items-start py-6">
                    <div className="w-full flex flex-col gap-4">
                        <input
                            type="text"
                            className="w-full bg-secondary drop-shadow-sm rounded-md placeholder:text-primary py-3"
                            placeholder="Nama Lengkap"
                        />
                        <input
                            type="text"
                            className="w-full bg-secondary drop-shadow-sm rounded-md placeholder:text-primary py-3"
                            placeholder="Email"
                        />
                        <textarea
                            type="text"
                            className="w-full bg-secondary drop-shadow-sm rounded-md placeholder:text-primary py-3"
                            placeholder="Masukkan pesan anda disini"
                        />
                        <button className=" font-bold hover:text-primary hover:bg-white bg-secondary w-[150px] px-4 py-2 rounded-md">
                            Kirim Pesan
                        </button>
                    </div>
                    <div className="w-full text-white">
                        <h1 className="font-bold text-xl">Get In Touch</h1>
                        <p>
                            Silahkan hubungi kami melalui form isian atau
                            saluran di bawah ini.
                        </p>
                        <div className="my-3 flex gap-x-3 leading-3 items-center">
                            <span>
                                <Phone />
                            </span>
                            <p>082345346786</p>
                        </div>
                        <div className="my-3 flex gap-x-3 leading-3 items-center">
                            <span>
                                <Email />
                            </span>
                            <p>082345346786</p>
                        </div>
                        <div className="my-3 flex gap-x-3 leading-6 items-center">
                            <span>
                                <LocationCity />
                            </span>
                            <p>
                                jalan Jenderal Gatot Subroto, kelurahan Simboro,
                                Kecamatan Simboro
                            </p>
                        </div>
                    </div>
                </div>
             
                </div>
            </div> */}
            <div className="bg-primary min-h-[250px] py-8 px-4 md:px-8 lg:px-16 bg-[url('/storage/image/background2.png')] bg-[contain] bg-right-bottom bg-no-repeat flex flex-col gap-3 md:flex-row">
                <div>
                    <h1 className="font-bold text-2xl text-secondary">
                        HEAD OFFICE
                    </h1>
                    <div className="my-4">
                        <div className="w-full text-white">
                            <p>
                                Official Website Dinas Lingkungan Hidup dan
                                Kebersihan Kabupaten Mamuju
                            </p>
                            <div className="my-3 flex gap-x-3 leading-3 items-center">
                                <span>
                                    <Phone />
                                </span>
                                <p>082345346786</p>
                            </div>
                            <div className="my-3 flex gap-x-3 leading-3 items-center">
                                <span>
                                    <Email />
                                </span>
                                <p>082345346786</p>
                            </div>
                            <div className="my-3 flex gap-x-3 leading-6 items-center">
                                <span>
                                    <LocationCity />
                                </span>
                                <p>
                                    jalan Jenderal Gatot Subroto, kelurahan
                                    Simboro, Kecamatan Simboro
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl text-secondary">
                        Navigation
                    </h1>
                    <Link className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm">
                        Home
                    </Link>
                    <Link className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm">
                        Profile Kantor
                    </Link>
                    <Link className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm">
                        Kontak Kami
                    </Link>
                    <Link className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm">
                        Galery
                    </Link>
                    <Link className="font-medium  text-white hover:bg-white py-2 px-2 rounded-md hover:text-primary text-sm">
                        Berita
                    </Link>
                </div>
            </div>
            {/* footer */}
            <div className="py-2 flex justify-center items-center bg-slate-950 font-light text-white">
                <p>© 2025 Mahasiswa Universitas Tomakaka Mamuju </p>
            </div>
        </div>
    );
}
