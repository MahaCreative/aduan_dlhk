import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import { debounce, pickBy } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Index(props) {
    const petaSampah = props.petaSampah;
    const area = props.area;
    const [params, setParams] = useState({ cari: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("auth.kelola-peta-tempat-sampah"),
                pickBy({ ...query }),
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }, 350),
        []
    );
    useEffect(() => reload(params), [params]);
    const deleteHandler = (id) => {
        Swal.fire({
            title: "Yakin Hapus?",
            text: "apakah anda yakin ingin mengahpus tempat sampah ini dari peta? pengaduan yang terkait juga akan terhapus",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("auth.delete-peta-tempat-sampah", { id: id }),
                    {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "berhasil mengahpus tempat sampah baru pada peta",
                                icon: "success",
                            });
                        },
                    }
                );
            }
        });
    };
    return (
        <div className="py-6 px-4">
            <Head title="Kelola Jenis Pengaduan" />
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                <div className=" py-3 flex flex-row gap-x-3 items-center justify-between">
                    <Link
                        href={route("auth.create-peta-tempat-sampah")}
                        as="button"
                        className="bg-primary font-bold text-white py-3 px-3 rounded-md hover:bg-white hover:text-primary leading-3 "
                    >
                        <span className="mr-2">
                            <Add color="inherit" fontSize="inherit" />
                        </span>
                        <span>Tambah Peta Sampah Baru</span>
                    </Link>
                    <select
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        className="border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  capitalize"
                    >
                        <option value="">Pilih Area</option>
                        {area.map((item, key) => (
                            <option key={key} value={item.nama_wilayah}>
                                {item.nama_wilayah}
                            </option>
                        ))}
                    </select>
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
                            <Tables.Th>Aksi</Tables.Th>
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
                                    <Tables.Td>
                                        {item.pengaduan_bulanan}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_tahunan}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_count}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_count}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {moment(item.created_at).format("LL")}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.user.nama_lengkap}
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

Index.layout = (page) => <AuthLayout children={page} />;
