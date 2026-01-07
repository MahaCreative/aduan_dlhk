import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Tables from "@/Components/Tables";
import TextInput from "@/Components/TextInput";
import ResponseAlert from "@/Hook/ResponseAlert";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, router } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Index(props) {
    const { showResponse } = ResponseAlert();
    const jenis = props.jenis;
    const [formJenis, setFormJenis] = useState("");
    const [formError, setFormError] = useState(null);
    const [model, setModel] = useState(false);
    const createHandler = (e) => {
        router.post(
            route("auth.store-jenis-pengaduan"),
            { nama: formJenis },

            {
                onSuccess: () => {
                    setFormError(null);
                    setFormJenis("");
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil menambahkan 1 jenis pengaduan baru",
                        icon: "success",
                    });
                },
                onError: (err) => {
                    Swal.fire({
                        title: "Error",
                        text: "gagal menambahkan jenis pengaduan",
                        icon: "error",
                    });
                    setFormError(err.nama);
                },
            }
        );
    };
    const editHandler = (value) => {
        setModel(value);
        setFormJenis(value.nama);
    };
    const updateHandler = (e) => {
        router.post(
            route("auth.update-jenis-pengaduan"),
            { id: model.id, nama: formJenis },

            {
                onSuccess: () => {
                    setFormError(null);
                    setFormJenis("");
                    setModel(null);
                    Swal.fire({
                        title: "Sukses",
                        text: "Berhasil mengubah 1 jenis pengaduan ",
                        icon: "success",
                    });
                },
                onError: (err) => {
                    Swal.fire({
                        title: "Error",
                        text: "gagal memperbaharui jenis pengaduan",
                        icon: "error",
                    });
                    setFormError(err.nama);
                },
            }
        );
    };
    const deleteHandler = (id) => {
        router.delete(route("auth.delete-jenis-pengaduan", { id }), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil mengahapus 1 jenis pengaduan"
                );
            },
            onError: () => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal mengahapus 1 jenis pengaduan"
                );
            },
        });
    };
    return (
        <div className="py-6 px-4">
            <Head title="Kelola Jenis Pengaduan" />
            <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                <div className=" py-3 flex flex-row gap-x-3 items-center">
                    <div>
                        <InputLabel value={"Jenis Pengaduan"} />
                        <TextInput
                            value={formJenis}
                            onChange={(e) => setFormJenis(e.target.value)}
                        />
                        <InputError message={formError} />
                    </div>

                    <button
                        onClick={() =>
                            model ? updateHandler() : createHandler()
                        }
                        className="bg-primary font-bold text-white py-3 px-3 rounded-md hover:bg-white hover:text-primary leading-3 "
                    >
                        <span className="mr-2">
                            <Add color="inherit" fontSize="inherit" />
                        </span>
                        <span>
                            {model
                                ? "Update Jenis Pengaduan"
                                : "Tambah Jenis Pengaduan"}
                        </span>
                    </button>
                </div>
                <Tables>
                    <Tables.Thead>
                        <tr>
                            <Tables.Th>#</Tables.Th>
                            <Tables.Th>Jenis Pengaduan</Tables.Th>
                            <Tables.Th>Pengaduan Hari Ini</Tables.Th>
                            <Tables.Th>Pengaduan Bulan Ini</Tables.Th>
                            <Tables.Th>Pengaduan Tahun Ini</Tables.Th>
                            <Tables.Th>Total Pengaduan</Tables.Th>
                            <Tables.Th>Aksi</Tables.Th>
                        </tr>
                    </Tables.Thead>
                    <tbody>
                        {jenis.length > 0 ? (
                            jenis.map((item, key) => (
                                <Tables.Tr key={key}>
                                    <Tables.Td>{key + 1}</Tables.Td>

                                    <Tables.Td>{item.nama}</Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_harian + " Pengaudan"}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_bulanan + " Pengaudan"}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_tahunan + " Pengaudan"}
                                    </Tables.Td>
                                    <Tables.Td>
                                        {item.pengaduan_count + " Pengaudan"}
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
                                        <button
                                            type="button"
                                            onClick={() => editHandler(item)}
                                            className="bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-md text-white"
                                        >
                                            Edit
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
