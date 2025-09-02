import Tables from "@/Components/Tables";
import moment from "moment";
import React from "react";

export default function Cetak(props) {
    const petaSampah = props.petaSampah;
    return (
        <div className="px-4">
            <div className="py-2">
                <p>Laporan Peta Samoah</p>
                <p>Tanggal Cetak : {moment(new Date()).format("DD-MM-YYYY")}</p>
            </div>
            <Tables>
                <Tables.Thead>
                    <tr>
                        <Tables.Th>#</Tables.Th>
                        <Tables.Th>Kode Peta</Tables.Th>
                        <Tables.Th>Area</Tables.Th>
                        <Tables.Th>Alamat</Tables.Th>
                        <Tables.Th>Lat / Long</Tables.Th>

                        <Tables.Th>Pengaduan Hari Ini</Tables.Th>
                        <Tables.Th>Pengaduan Bulan Ini</Tables.Th>
                        <Tables.Th>Pengaduan Tahun Ini</Tables.Th>
                        <Tables.Th>Total Pengaduan</Tables.Th>
                        <Tables.Th>Created At</Tables.Th>
                        <Tables.Th>Created By</Tables.Th>
                    </tr>
                </Tables.Thead>
                <tbody>
                    {petaSampah.length > 0 ? (
                        petaSampah.map((item, key) => (
                            <Tables.Tr key={key}>
                                <Tables.Td className="w-[10px]">
                                    <p className="w-[10px]">{key + 1}</p>
                                </Tables.Td>

                                <Tables.Td>
                                    <p className="text-sm w-[50px]">
                                        {item.kd_peta}
                                    </p>
                                </Tables.Td>
                                <Tables.Td>
                                    <p className="text-sm w-[50px]">
                                        {item.area.nama_wilayah}
                                    </p>
                                </Tables.Td>
                                <Tables.Td>
                                    <p className="text-sm w-[100px]">
                                        {item.alamat}
                                    </p>
                                </Tables.Td>
                                <Tables.Td>
                                    <p className="text-sm w-[100px]">
                                        {item.lat}
                                    </p>
                                    <p className="text-sm w-[100px]">
                                        {item.long}
                                    </p>
                                </Tables.Td>
                                <Tables.Td>{item.pengaduan_bulanan}</Tables.Td>
                                <Tables.Td>{item.pengaduan_tahunan}</Tables.Td>
                                <Tables.Td>{item.pengaduan_count}</Tables.Td>
                                <Tables.Td>{item.pengaduan_count}</Tables.Td>
                                <Tables.Td>
                                    {moment(item.created_at).format("LL")}
                                </Tables.Td>
                                <Tables.Td>{item.user.nama_lengkap}</Tables.Td>
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
