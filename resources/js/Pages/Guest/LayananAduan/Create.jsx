import Maps from "@/Components/Maps";
import GuestLayout from "@/Layouts/GuestLayout";

import { useForm, usePage } from "@inertiajs/react";
import { Error, List } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { GeoJSON, Marker, Popup } from "react-leaflet";
import * as turf from "@turf/turf";
import L from "leaflet";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";

export default function Create({ jenisPengaduan, peta, wilayah }) {
    const imageRef = useRef();
    const { auth } = usePage().props;
    const [preview, setPreview] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        area_kerja_id: "",
        nama_pelapor: "",
        judul_pengaduan: "",
        deskripsi_pengaduan: "",
        foto_pengaduan: "",
        telph: "",
        jenis_pengaduan_id: "",
        jenis_pengaduan: "",
        wilayah: "",
        lat: "",
        long: "",
    });
    const { profile } = usePage().props;
    const pilihPengaduan = (item) => {
        setData({
            ...data,
            jenis_pengaduan: item.nama,
            jenis_pengaduan_id: item.id,
        });
    };
    const handleMapClick = ({ lat, lng }) => {
        let wilayahName = "";
        let wilayahId = "";
        wilayah.forEach((item) => {
            let geojson;
            try {
                geojson = JSON.parse(item.geojson);
            } catch (error) {
                console.error("Invalid GeoJSON format for item:", item);
                return;
            }

            // Check if geojson is a feature and has geometry
            if (
                geojson.type === "Feature" &&
                geojson.geometry &&
                geojson.geometry.type === "Polygon"
            ) {
                const point = turf.point([lng, lat]);
                const polygon = turf.polygon(geojson.geometry.coordinates);

                if (turf.booleanPointInPolygon(point, polygon)) {
                    wilayahName = item.nama_wilayah;
                    wilayahId = item.id;
                }
            } else {
                console.error(
                    "GeoJSON is not a valid Polygon feature for item:",
                    item
                );
            }
        });
        if (wilayahName == "") {
            Swal.fire({
                title: "Errors",
                icon: "error",
                text: "Titik lokasi yang anda pilih tidak terdaftar dalam wilayah kerja kami",
            });
        } else {
            Swal.fire({
                title: "Apakah lokasi sudah benar?",
                text:
                    "Kami sangat berharap lokasi pengaduan yang anda pilih sudah sesuai dengan lokasi terjadinya masalah " +
                    wilayahName,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya Tambahkan",
            }).then((result) => {
                if (result.isConfirmed) {
                    setData({
                        ...data,
                        area_kerja_id: wilayahId,
                        wilayah: wilayahName,
                        lat: lat,
                        long: lng,
                    });
                } else {
                    wilayahName = "";
                    wilayahId = "";
                }
            });
        }
    };
    const customIcon = new L.Icon({
        iconUrl: "/storage/image/icon_sampah.png", // jika di dalam folder public
        iconSize: [32, 32], // ukuran icon
        iconAnchor: [16, 32], // titik tengah bawah icon
        popupAnchor: [0, -32], // posisi popup relatif ke icon
    });
    const createCustomIcon = () => {
        return new L.DivIcon({
            html: `<div>
                 ${ReactDOMServer.renderToString(
                     <p
                         className={`bg-red-500 p-2 backdrop-blur-sm rounded-full h-[40px] w-[40px] text-white text-xl flex justify-center items-center tracking-tighter leading-3`}
                         style={{ fontSize: "24px" }}
                     >
                         <Error color="inherit" fontSize="inherit" />
                     </p>
                 )}
               </div>`,
            className: "custom-icon",
            iconSize: [32, 32],
        });
    };

    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, foto_pengaduan: image }));
    };

    const [locating, setLocating] = useState(false);
    const useMyLocation = async () => {
        if (!navigator.geolocation) {
            Swal.fire({
                title: "Error",
                text: "Geolocation tidak didukung oleh browser ini",
                icon: "error",
            });
            return;
        }

        // If Permissions API is available, check status first to avoid unnecessary prompts
        try {
            if (navigator.permissions && navigator.permissions.query) {
                const status = await navigator.permissions.query({
                    name: "geolocation",
                });
                if (status.state === "denied") {
                    Swal.fire({
                        title: "Izin Lokasi Ditolak",
                        text: "Izin lokasi ditolak untuk situs ini. Aktifkan izin lokasi di pengaturan browser atau gunakan HTTPS/localhost.",
                        icon: "warning",
                    });
                    return;
                }
            }
        } catch (e) {
            console.debug("Permissions API check failed:", e);
        }

        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                // reuse existing handleMapClick logic for validation and confirmation
                handleMapClick({ lat, lng });
                setLocating(false);
            },
            (err) => {
                console.error("geolocation error", err);
                if (err.code === 1) {
                    Swal.fire({
                        title: "Izin Ditolak",
                        text: "Anda menolak akses lokasi. Aktifkan izin lokasi di pengaturan browser.",
                        icon: "error",
                    });
                } else if (err.code === 2) {
                    Swal.fire({
                        title: "Lokasi Tidak Tersedia",
                        text: "Tidak dapat menentukan lokasi Anda. Coba lagi atau pilih manual pada peta.",
                        icon: "error",
                    });
                } else if (err.code === 3) {
                    Swal.fire({
                        title: "Timeout",
                        text: "Mencari lokasi memakan waktu terlalu lama. Coba lagi.",
                        icon: "error",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Gagal mendapatkan lokasi. Pastikan izin lokasi diberikan dan situs dijalankan di HTTPS atau localhost.",
                        icon: "error",
                    });
                }
                setLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const submit = (e) => {
        e.preventDefault();
        if (auth.user == null) {
            Swal.fire({
                title: "Error",
                text: "Silahkan login terlebih dahulu untuk melakukan pengaduan",
                icon: "error",
            });
            return null;
        }
        if (data.wilayah == "" || data.lat == "" || data.long == "") {
            Swal.fire({
                title: "Error",
                text: "Silahkan memilih lokasi pengaduan terlebih dahulu",
                icon: "error",
            });
        } else {
            post(route("store-layanan-aduan"), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Berhasil",
                        text: "Berhasil membuat pengaduan, silahkan menunggu konfirmasi dari petugas",
                        icon: "success",
                    });
                },
                onError: () => {
                    Swal.fire({
                        title: "Gagal",
                        text: "Gagal melakukan pengaduan, periksa kembali isian anda",
                        icon: "error",
                    });
                },
            });
        }
    };

    const pilihPeta = (item) => {
        setData({
            ...data,
            lat: item.lat,
            long: item.long,
            area_kerja_id: item.area_kerja_id,
        });
        Swal.fire({
            title: "Sukses",
            text: "Titk sampah berhasil dijadikan lokasi pengaduan, silahkan kirim pengaduan",
            icon: "success",
        });
    };

    useEffect(() => {
        if (auth.user) {
            setData({
                ...data,
                nama_pelapor: auth.user.nama_lengkap,
                telph: auth.user.telp,
            });
        }
    }, []);

    return (
        <div className="py-6 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full md:w-1/3 py-2 px-3 bg-white rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[260px] overflow-y-auto">
                    <h1 className="text-xl font-bold text-primary tracking-tighter">
                        Silahkan Memilih Jenis Pengaduan
                    </h1>
                    {jenisPengaduan.map((item, key) => (
                        <div
                            onClick={() => pilihPengaduan(item)}
                            className={`${
                                data.jenis_pengaduan_id === item.id
                                    ? "bg-primary text-white"
                                    : "text-black"
                            } flex gap-3 items-center hover:bg-primary hover:text-white  font-bold hover:cursor-pointer transition-all duration-300 ease-in-out py-1 px-3`}
                            key={key}
                        >
                            <div className="tracking-tighter leading-3  text-2xl">
                                <List color="inherit" fontSize="inherit" />
                            </div>
                            <p className="capitalize">{item.nama}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full py-2 px-3 bg-white rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                    <form onSubmit={submit} action="" className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="nama_pelapor"
                                    value={"Nama Pelapor"}
                                />
                                <TextInput
                                    className="w-full"
                                    name="nama_pelapor"
                                    value={data.nama_pelapor}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                                <InputError message={errors.nama_pelapor} />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="judul_pengaduan"
                                    value={"Judul Pengaduan"}
                                />
                                <TextInput
                                    className="w-full"
                                    name="judul_pengaduan"
                                    value={data.judul_pengaduan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                                <InputError message={errors.judul_pengaduan} />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="telph"
                                    value={"Telp (WA) Pelapor"}
                                />
                                <TextInput
                                    className="w-full"
                                    name="telph"
                                    value={data.telph}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                />
                                <InputError message={errors.telph} />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="jenis_pengaduan"
                                    value={"Jenis Pengaduan"}
                                />
                                <TextInput
                                    disabled
                                    className="w-full"
                                    name="jenis_pengaduan"
                                    value={data.jenis_pengaduan}
                                />
                                <InputError message={errors.jenis_pengaduan} />
                            </div>
                        </div>
                        <div className="my-2">
                            <InputLabel
                                htmlFor="deskripsi_pengaduan"
                                value={"Deskripsi Pengaduan"}
                            />
                            <TextInput
                                className="w-full"
                                name="deskripsi_pengaduan"
                                value={data.deskripsi_pengaduan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors.deskripsi_pengaduan} />
                        </div>
                        <button className="bg-primary rounded-md p-2 hover:opacity-90 transition-all duration-300 ease-in-out text-white leading-3 tracking-tighter">
                            Kirim Pengaduan
                        </button>
                    </form>
                </div>
                <div
                    onClick={() => imageRef?.current.click()}
                    className="relative hover:cursor-pointer"
                >
                    <img
                        src={
                            preview
                                ? preview
                                : "/storage/image/default_thumnbnail.jpg"
                        }
                        alt=""
                        className="w-[500px] h-[300px] object-cover"
                    />
                    <input
                        type="file"
                        onChange={changeImage}
                        ref={imageRef}
                        hidden
                    />
                    <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                        {errors.foto_pengaduan ? (
                            <div className="bg-white py-1.5 px-2.5">
                                <InputError message={errors.foto_pengaduan} />
                            </div>
                        ) : (
                            preview == null && (
                                <p className="text-xs text-white font-light bg-primary py-1.5 px-2.5 rounded-md">
                                    Click untuk memasukkan foto bukti pengaduan
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="my-3">
                <p className="py-2 px-3 rounded-md bg-gray-500/50 my-3 inline-block">
                    Silahkan double click Maps untuk menandai titik lokasi
                    pengaduan anda atau silahkan pilih lokasi titik tempat
                    sampah yang ada disekitar lokasi pengaduan
                </p>
                <div className="my-3">
                    <button
                        type="button"
                        onClick={useMyLocation}
                        disabled={locating}
                        className="btn-primary"
                    >
                        {locating
                            ? "Mencari lokasi..."
                            : "Gunakan Lokasi Anda Saat Ini"}
                    </button>
                </div>
                <Maps
                    onMapClick={handleMapClick}
                    position={[profile.lat, profile.long]}
                    style={{
                        height: "350px",
                        width: "100%",
                        margin: "auto",
                        overflow: "hidden", // pastikan overflow tersembunyi
                    }}
                >
                    {wilayah.map((item, key) => {
                        const geojson = JSON.parse(item.geojson);
                        const centroid =
                            turf.centroid(geojson).geometry.coordinates;

                        const textIcon = L.divIcon({
                            html: `<div style="color: black; font-size: 12px">${item.nama_wilayah}</div>`,
                            className: "", // Ensure no default styles are applied
                        });

                        return (
                            <React.Fragment key={key}>
                                <GeoJSON
                                    style={{ color: item.kode_warna }}
                                    data={geojson}
                                />
                            </React.Fragment>
                        );
                    })}
                    {peta.length > 0 &&
                        peta.map((item, key) => (
                            <Marker
                                key={key}
                                position={[item.lat, item.long]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <p>
                                        Apakah anda akan memilih titik tempat
                                        sampah ini menjadi lokasi pengaduan
                                        anda?
                                    </p>
                                    <button
                                        onClick={() => pilihPeta(item)}
                                        className="bg-primary text-white py-2 px-3"
                                    >
                                        Pilih Tempat Sampah
                                    </button>
                                </Popup>
                            </Marker>
                        ))}
                    {(data.lang !== "" || data.long !== "") && (
                        <Marker
                            position={[data.lat, data.long]}
                            icon={customIcon}
                        ></Marker>
                    )}
                </Maps>
            </div>
        </div>
    );
}

Create.layout = (page) => (
    <GuestLayout children={page} title={"Buat Pengaduan Baru"} />
);
