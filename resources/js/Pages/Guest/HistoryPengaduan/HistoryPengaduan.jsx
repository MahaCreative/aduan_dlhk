import Tables from "@/Components/Tables";
import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function HistoryPengaduan(props) {
    const pengaduan = props.pengaduan;
    return (
        <div>
            <div className="py-3 flex justify-center items-center h-[300px] bg-primary flex-col bg-[url('/storage/image/background2.png')] bg-contain bg-no-repeat">
                <h1 className="font-bold text-white text-3xl">
                    History Pengaduan Anda
                </h1>
            </div>
            <div className="px-4 md:px-8 lg:px-16 py-6">
                <Tables>
                    <Tables.Thead>
                        <tr>
                            <Tables.Th>#</Tables.Th>

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
                                                    "detail-history-pengaduan",
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
        </div>
    );
}

HistoryPengaduan.layout = (page) => <GuestLayout children={page} />;
