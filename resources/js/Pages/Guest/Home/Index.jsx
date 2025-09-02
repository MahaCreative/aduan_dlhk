import Maps from "@/Components/Maps";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowDownward,
    ArrowDropDown,
    CalendarMonth,
    Email,
    Face,
    LocationCity,
    Phone,
} from "@mui/icons-material";
import moment from "moment";
import React from "react";
import { Marker } from "react-leaflet";

export default function Index(props) {
    const { profile } = usePage().props;
    const galery = props.galery;
    const berita = props.berita;
    return (
        <>
            <div className="bg-secondary h-[700px] md:h-[600px] w-full flex justify-center items-start flex-col px-4 md:px-8 lg:px-16">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                    <div className="w-full">
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl w-full tracking-tight text-primary">
                            Sistem informasi layanan pengaduan Layanan
                            Kebersihan DLHK Provinsi Mamuju
                        </h1>
                        <p className="text-xl tracking-tighter font-light text-white font-heebo w-full mt-4">
                            laporakan masalah kebersihan di lingkungan Anda
                            melalui sistem pengaduan layanan kebersihan dengan
                            mudah dan cepat melalui tombol Pengaduan dibawah ini
                        </p>
                        <button className="my-3 bg-primary text-white  py-2 px-4 rounded-md mt- hover:bg-white hover:text-primary font-bold text-xl">
                            Buat Pengaduan
                        </button>
                    </div>
                    <img
                        src={"/storage/" + profile.logo}
                        alt={profile.nama_instansi}
                        className="w-[250px] md:w-[400px] lg:w-[550px] "
                    />
                </div>
            </div>
            {/* about me */}
            <div className="bg-background ">
                <div className="flex flex-col md:flex-row  items-start">
                    <div className="w-full md:w-1/2 bg-primary px-8 py-6 min-h-[300px]">
                        <h1 className="text-4xl font-bold text-secondary">
                            About Me
                        </h1>
                        <p
                            className="line-clamp-4 font-light tracking-tight mt-6"
                            dangerouslySetInnerHTML={{
                                __html: profile.keteragan,
                            }}
                        />
                        <Link
                            href={route("about_me")}
                            as="button"
                            className="bg-secondary   py-2 px-4 rounded-md mt- hover:bg-white hover:text-primary font-bold "
                        >
                            Selengkapnya
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 bg-secondary px-8 py-6 min-h-[300px] bg-[url('/storage/image/bg3.png')] bg-contain bg-no-repeat bg-right-bottom">
                        <h1 className="text-4xl font-bold text-primary">
                            Sambutan Kepala Dinas
                        </h1>
                        <p
                            className="line-clamp-4 font-light tracking-tight mt-6"
                            dangerouslySetInnerHTML={{
                                __html: profile.sambutan,
                            }}
                        />
                    </div>
                </div>
                <div className="rounded-md overflow-hidden drop-shadow-md px-4 md:px-8 lg:px-16">
                    <Maps
                        zoom={15} // onMapClick={handleMapClick}
                        position={[profile.lat, profile.long]}
                        style={{
                            height: "350px",
                            width: "100%",
                            margin: "auto",
                            overflow: "hidden", // pastikan overflow tersembunyi
                        }}
                    >
                        <Marker position={[profile.lat, profile.long]}></Marker>
                    </Maps>
                </div>
            </div>
            {/* Berita */}
            {berita.length > 0 && (
                <div className="bg-primary min-h-[600px] py-8 px-4 md:px-8 lg:px-16 w-full">
                    <h1 className="text-secondary text-center font-bold text-2xl">
                        Berita
                    </h1>
                    <duv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
                        {berita.map((item, key) => (
                            <Link
                                as="div"
                                href={route("detail-berita", item.slug)}
                                className="py-3 px-2 flex flex-row gap-x-2 bg-white rounded-md hover:cursor-pointer hover:bg-secondary"
                            >
                                <img
                                    src={"/storage/" + item.thumbnail}
                                    alt={item.judul_berita}
                                    className="w-[100px] h-[100px]"
                                />
                                <div>
                                    <h1 className="font-bold text-lg tracking-tight text-primary capitalize">
                                        {item.judul_berita}
                                    </h1>
                                    <div className="flex gap-x-3 text-primary">
                                        <div className="font-light text-sm capitalize leading-3">
                                            <span className="mx-3">
                                                <Face />
                                            </span>
                                            <span>
                                                {item.user.nama_lengkap}
                                            </span>
                                        </div>
                                        <div className="font-light text-sm capitalize leading-3">
                                            <span>
                                                <CalendarMonth />
                                            </span>
                                            {moment(item.created_at).format(
                                                "ll"
                                            )}
                                        </div>
                                    </div>
                                    <p
                                        className="tracking-tight font-light text-sm line-clamp-3 py-4"
                                        dangerouslySetInnerHTML={{
                                            __html: item.kontent,
                                        }}
                                    ></p>
                                </div>
                            </Link>
                        ))}
                    </duv>
                    <div className="w-full flex flex-row  justify-center items-center py-6">
                        <Link
                            href={route("berita")}
                            as="button"
                            className="bg-secondary hover:bg-white hover:text-primary py-3 px-4 rounded-md  font-bold  flex gap-x-3 leading-3 flex items-center"
                        >
                            <span>Load More</span>
                            <span>
                                <ArrowDropDown />
                            </span>
                        </Link>
                    </div>
                </div>
            )}
            {/* Galery */}
            {galery.length > 0 && (
                <div className="bg-secondary min-h-[600px] py-8 px-4 md:px-8 lg:px-16 bg-[url('/storage/image/background2.png')] bg-[contain] bg-left-bottom bg-no-repeat ">
                    <h1 className="text-primary text-center font-bold text-2xl">
                        Galery
                    </h1>
                    <duv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
                        {galery.map((item, key) => (
                            <Link
                                as="div"
                                href={route("detail-galery", item.slug)}
                                className="py-3 px-2 flex flex-row gap-x-2 bg-white rounded-md hover:cursor-pointer hover:bg-primary group"
                            >
                                <img
                                    src={"/storage/" + item.thumbnail}
                                    alt={item.judul_berita}
                                    className="w-[100px] h-[100px]"
                                />
                                <div>
                                    <h1 className="font-bold text-lg tracking-tight text-primary capitalize group-hover:text-secondary">
                                        {item.judul_berita}
                                    </h1>
                                    <div className="flex gap-x-3 text-primary">
                                        <div className="font-light text-sm capitalize leading-3">
                                            <span className="mx-3">
                                                <Face />
                                            </span>
                                            <span>
                                                {item.user.nama_lengkap}
                                            </span>
                                        </div>
                                        <div className="font-light text-sm capitalize leading-3">
                                            <span>
                                                <CalendarMonth />
                                            </span>
                                            {moment(item.created_at).format(
                                                "ll"
                                            )}
                                        </div>
                                    </div>
                                    <p
                                        className="tracking-tight font-light text-sm line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                            __html: item.kontent,
                                        }}
                                    ></p>
                                </div>
                            </Link>
                        ))}
                    </duv>
                    <div className="w-full flex flex-row  justify-center items-center py-6">
                        <Link
                            href={route("galery")}
                            as="button"
                            className="bg-secondary hover:bg-white hover:text-primary py-3 px-4 rounded-md  font-bold  flex gap-x-3 leading-3 flex items-center"
                        >
                            <span>Load More</span>
                            <span>
                                <ArrowDropDown />
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
