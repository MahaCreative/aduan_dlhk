import Maps from "@/Components/Maps";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import React from "react";

import * as turf from "@turf/turf";

import { GeoJSON, Marker } from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2";
export default function Index(props) {
    const rute = props.rute;
    const deleteHandler = (id) => {
        router.delete(route("auth.delete-rute-kerja", { id: id }), {
            onSuccess: (data) => {
                console.log(data);

                Swal.fire({
                    title: "Sukses",
                    text: "1 data area kerja telah berhasil dihapus",
                    icon: "success",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    type: "error",
                    text: "Gagal menghapus wilayah kerja",
                    icon: "error",
                });
            },
        });
    };
    return (
        <>
            <Head title="Kelola Rute Kerja" />
            <div className="py-6 px-8">
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                    <div className=" py-3 flex flex-row justify-between items-center">
                        <Link
                            as="button"
                            href={route("auth.create-rute-kerja")}
                            className="bg-primary font-bold text-white py-2 px-3 rounded-md hover:bg-white hover:text-primary"
                        >
                            <span>
                                <Add color="inherit" fontSize="inherit" />
                            </span>
                            <span>Tambah Rute Kerja</span>
                        </Link>
                    </div>
                    <Tables>
                        <Tables.Thead>
                            <tr>
                                <Tables.Th>#</Tables.Th>
                                <Tables.Th>Nama Wilayah</Tables.Th>
                                <Tables.Th>Jumlah Petugas</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </Tables.Thead>
                        <tbody>
                            {rute.length > 0 ? (
                                rute.map((item, key) => (
                                    <Tables.Tr key={key}>
                                        <Tables.Th>{key + 1}</Tables.Th>
                                        <Tables.Td>
                                            {item.nama_wilayah}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.users_count + " Petugas"}
                                        </Tables.Td>
                                        <Tables.Td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteHandler(item.id)
                                                }
                                                className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md text-white"
                                            >
                                                Delete
                                            </button>
                                        </Tables.Td>
                                    </Tables.Tr>
                                ))
                            ) : (
                                <Tables.Tr>
                                    {" "}
                                    <Tables.Td colspan={9}>
                                        <p className="w-full text-center">
                                            Belum ada data yang ditambahkan
                                        </p>
                                    </Tables.Td>
                                </Tables.Tr>
                            )}
                        </tbody>
                    </Tables>
                </div>
                <div className="py-5 px-8">
                    <Maps
                        position={[-7.7978, 110.37]}
                        zoom={20}
                        style={{
                            height: "550px",
                            width: "100%",
                            margin: "auto",
                            overflow: "hidden", // pastikan overflow tersembunyi
                        }}
                    >
                        {rute.map((item, key) => {
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
                                    <Marker
                                        position={[centroid[1], centroid[0]]}
                                        icon={textIcon}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Maps>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
