import Tables from "@/Components/Tables";
import CetakLayout from "@/Layouts/CetakLayout";
import moment from "moment";
import React from "react";

export default function Cetak(props) {
    const pengaduan = props.pengaduan;
    return (
        <div className="px-4">
            <div className="py-2">
                <p>Laporan Pengaduan Masyarakat</p>
                <p>Tanggal Cetak : {moment(new Date()).format("DD-MM-YYYY")}</p>
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
                                        {moment(item.created_at).format("LL")}
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
    );
}

Cetak.layout = (page) => <CetakLayout children={page} />;
