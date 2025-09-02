import Maps from "@/Components/Maps";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import * as turf from "@turf/turf";
import { GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import Index from "./Index";
import AuthLayout from "@/Layouts/AuthLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
export default function Create(props) {
    const { profile } = usePage().props;
    const peta = props.peta;
    const area_kerja = props.area_kerja;
    const { data, setData, post, reset, errors } = useForm({
        area_kerja_id: "",
        nama_area: "",
        alamat: "",
        lat: "",
        long: "",
    });
    const handleMapClick = ({ lat, lng }) => {
        let wilayahName = "";
        let wilayahId = "";
        area_kerja.forEach((item) => {
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
                title: "Tambah Peta Sampah",
                text:
                    "Apakah anda yakin ingin menambahkan tempat sampah baru di wilayah " +
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
                        nama_area: wilayahName,
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
    const simpanHandler = () => {
        post(route("auth.store-peta-tempat-sampah"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "1 Tempat sampah baru berhasil ditambahkan di peta",
                    icon: "success",
                });
                reset();
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "gagal menabhakan 1 tempat sampah baru di peta",
                    icon: "error",
                });
            },
        });
    };

    return (
        <div className="py-3 px-4">
            <div className="flex flex-col md:flex-row gap-3 items-start">
                <div className="w-full bg-white py-3 px-4 rounded-md border border-primary">
                    <InputLabel value={"Nama Area"} />
                    <TextInput
                        className="w-full"
                        disabled
                        value={data.nama_area}
                    />
                    <InputError message={errors.nama_area} />
                    <InputLabel value={"Alamat"} />
                    <TextInput
                        className="w-full"
                        value={data.alamat}
                        onChange={(e) =>
                            setData({ ...data, alamat: e.target.value })
                        }
                    />
                    <InputError message={errors.alamat} />
                    <InputLabel value={"Latitude"} />
                    <TextInput className="w-full" value={data.lat} disabled />
                    <InputError message={errors.lat} />
                    <InputLabel value={"longtitude"} />
                    <TextInput className="w-full" value={data.long} disabled />
                    <InputError message={errors.long} />
                    <div className="flex gap-3">
                        <button
                            onClick={simpanHandler}
                            className="text-white py-2 px-4 rounded-md hover:bg-teal-800 bg-teal-600 transition-all duration-300 ease-in-out"
                        >
                            Simpan Wilayah
                        </button>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="text-white py-2 px-4 rounded-md hover:bg-red-800 bg-red-600 transition-all duration-300 ease-in-out"
                        >
                            Batal
                        </button>
                    </div>
                </div>
                <div className="w-full bg-white py-3 px-4 rounded-md border border-primary">
                    <p>
                        Silahkan klick peta untuk menambahkan lokasi tempat
                        sampah baru
                    </p>
                    <Maps
                        onMapClick={handleMapClick}
                        zoom={15} // onMapClick={handleMapClick}
                        position={[profile.lat, profile.long]}
                        style={{
                            height: "350px",
                            width: "100%",
                            margin: "auto",
                            overflow: "hidden", // pastikan overflow tersembunyi
                        }}
                    >
                        {area_kerja.map((item, key) => {
                            const geojson = JSON.parse(item.geojson);
                            const centroid =
                                turf.centroid(geojson).geometry.coordinates;
                            const textIcon = L.divIcon({
                                html: `<div style="color: ${item.kode_warna}; font-size: 17px" font-weight:900;>${item.nama_wilayah}</div>`,
                                className: "", // Ensure no default styles are applied
                            });
                            return (
                                <React.Fragment key={key}>
                                    <GeoJSON
                                        style={{ color: item.kode_warna }}
                                        data={geojson}
                                    />
                                    <Marker
                                        position={[centroid[1], centroid[0]]}
                                        icon={textIcon}
                                    />
                                </React.Fragment>
                            );
                        })}
                        {peta.length > 0 &&
                            peta.map((item, key) => (
                                <Marker
                                    position={[item.lat, item.long]}
                                    icon={customIcon}
                                ></Marker>
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
        </div>
    );
}

Create.layout = (page) => <AuthLayout children={page} />;
