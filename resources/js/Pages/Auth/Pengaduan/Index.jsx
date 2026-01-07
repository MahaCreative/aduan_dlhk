import Maps from "@/Components/Maps";
import Tables from "@/Components/Tables";
import { Link, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";
import L from "leaflet";
import * as turf from "@turf/turf";
import { GeoJSON, Marker, Popup } from "react-leaflet";
import { Build, Cancel, Done, Error, Home } from "@mui/icons-material";
import ReactDOMServer from "react-dom/server";
import AuthLayout from "@/Layouts/AuthLayout";
export default function Index(props) {
    const { profile } = usePage().props;
    const pengaduan = props.pengaduan;
    const area_kerja = props.area_kerja;
    const [params, setParams] = useState({
        cari: "",
        area: "",
        jenis_pengaduan: "",
    });
    const createCustomIcon = (status) => {
        let color;
        switch (status) {
            case "menunggu konfirmasi":
                color = "bg-orange-500"; // Ganti dengan warna yang diinginkan
                break;
            // Tambahkan kondisi lain jika diperlukan
            case "di proses":
                color = "bg-primary"; // Ganti dengan warna yang diinginkan
                break;
            // Tambahkan kondisi lain jika diperlukan
            case "di batalkan":
                color = "bg-red-500"; // Ganti dengan warna yang diinginkan
                break;
            case "selesai":
                color = "bg-green-500"; // Ganti dengan warna yang diinginkan
                break;
            default:
                color = "blue"; // Warna default
        }

        return new L.DivIcon({
            html: `<div>
             ${ReactDOMServer.renderToString(
                 <p
                     className={`${color} p-2 backdrop-blur-sm rounded-full h-[40px] w-[40px] text-white text-xl flex justify-center items-center tracking-tighter leading-3`}
                     style={{ fontSize: "24px" }}
                 >
                     {status == "selesai" ? (
                         <Done color="inherit" fontSize="inherit" />
                     ) : status == "di batalkan" ? (
                         <Cancel color="inherit" fontSize="inherit" />
                     ) : status == "di proses" ? (
                         <Build color="inherit" fontSize="inherit" />
                     ) : (
                         <Error color="inherit" fontSize="inherit" />
                     )}
                 </p>
             )}
           </div>`,
            className: "custom-icon",
            iconSize: [32, 32],
        });
    };
    return (
        <div>
            <div className="py-6 px-8">
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                    <div className=" py-3 flex flex-row justify-between items-center">
                        <div className="flex gap-3">
                            <input
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                                value={params.cari}
                                placeholder="Cari Petugas...."
                                type="text"
                                className="bg-secondary text-primary rounded-md outline-none border-none ring-0 focus:ring-0 focus:border-none focus:outline-primary"
                            />
                            <select
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        area_kerja: e.target.value,
                                    })
                                }
                                className="bg-secondary text-primary rounded-md outline-none border-none ring-0 focus:ring-0 focus:border-none focus:outline-primary"
                                name=""
                                id=""
                                value={params.area_kerja}
                            >
                                <option value="">Pilih area kerja</option>
                                {area_kerja.map((item, key) => (
                                    <option key={key} value={item.nama_wilayah}>
                                        {item.nama_wilayah}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Tables>
                        <Tables.Thead>
                            <tr>
                                <Tables.Th>#</Tables.Th>
                                <Tables.Th>Nama Pelapor</Tables.Th>
                                <Tables.Th>Telp Pelapor</Tables.Th>
                                <Tables.Th>Jenis Pengaduan</Tables.Th>
                                <Tables.Th>Area Pengaduan</Tables.Th>
                                <Tables.Th>Status Pengaduan</Tables.Th>
                                <Tables.Th>Status Lapangan</Tables.Th>
                                <Tables.Th>Petugas Menangani</Tables.Th>
                                <Tables.Th>Tanggal Pengaduan</Tables.Th>
                                <Tables.Th>Tanggal Penanganan</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </Tables.Thead>
                        <tbody>
                            {pengaduan.length > 0 ? (
                                pengaduan.map((item, key) => (
                                    <Tables.Tr key={key}>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[10px]">
                                                {key + 1}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[80px]">
                                                {item.nama_pelapor}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[70px]">
                                                {item.telph}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[130px]">
                                                {item.jenis_pengaduan.nama}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[50px]">
                                                {item.area.nama_wilayah}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[50px]">
                                                {item.status_pengaduan}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[50px]">
                                                {item.status_lapangan}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[100px]">
                                                {item.petugas
                                                    ? item.petugas.nama_lengkap
                                                    : "Belum ditangani"}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[100px]">
                                                {moment(item.created_at).format(
                                                    "LL"
                                                )}
                                            </p>
                                        </Tables.Td>
                                        <Tables.Td className="text-xs">
                                            <p className="text-xs w-[100px]">
                                                {item.tanggal_proses
                                                    ? moment(
                                                          item.tanggal_proses
                                                      ).format("LL")
                                                    : "belum ditangani"}
                                            </p>
                                        </Tables.Td>

                                        <Tables.Td className="text-xs flex gap-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "auth.detail-pengaduan",
                                                        item.kd_pengaduan
                                                    )}
                                                    type="button"
                                                    onClick={() =>
                                                        deleteHandler(item.id)
                                                    }
                                                    className="bg-primary hover:opacity-90 py-2 px-4 rounded-md text-white"
                                                >
                                                    Lihat
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteHandler(item.id)
                                                    }
                                                    className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </Tables.Td>
                                    </Tables.Tr>
                                ))
                            ) : (
                                <Tables.Tr>
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
                <div className="py-6 px-5 rounded-md">
                    <Maps
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
                        {pengaduan.map((item, index) => (
                            <Marker
                                icon={createCustomIcon(item.status_pengaduan)}
                                key={index}
                                position={[item.lat, item.long]}
                            >
                                <Popup>
                                    <a
                                        target="_blank"
                                        href={"/storage/" + item.foto_pengaduan}
                                    >
                                        <img
                                            src={
                                                "/storage/" +
                                                item.foto_pengaduan
                                            }
                                            alt=""
                                        />
                                    </a>
                                    <p className="text-primary font-bold capitalize">
                                        {item.jenis_pengaduan.nama}
                                    </p>
                                    <p className="text-primary font-bold capitalize text-xs">
                                        {item.status_pengaduan}
                                    </p>
                                    <p className="text-primary font-bold capitalize">
                                        {item.telph}
                                    </p>
                                    <p>{moment(item.created_at).fromNow()}</p>
                                    <Link
                                        href={route(
                                            "auth.detail-pengaduan",
                                            item.kd_pengaduan
                                        )}
                                        className="text-sm text-primary"
                                    >
                                        Lihat Detail Pengaduan
                                    </Link>
                                </Popup>
                            </Marker>
                        ))}
                    </Maps>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
