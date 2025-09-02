import Modal from "@/Components/Modal";
import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import { debounce, pickBy } from "lodash";

export default function Index(props) {
    const petugas = props.petugas;
    const { area_kerja } = usePage().props;
    const [modalForm, setModalForm] = useState(false);
    const [params, setParams] = useState({ cari: "", area_kerja: "" });
    const deleteHandler = (id) => {
        router.delete(route("auth.delete-petugas", { id: id }));
    };

    const reload = useCallback(
        debounce((query) => {
            router.get(route("auth.kelola-petugas"), pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true, // opsional agar state tetap
            });
        }, 300),
        []
    );

    useEffect(() => {
        reload(params);
    }, [params]);
    return (
        <>
            <Head title="Kelola Petugas" />
            <Modal
                maxWidth="max-w-[90%]"
                show={modalForm}
                onClose={() => setModalForm(false)}
                title={"Tambah Petugas Baru"}
            >
                <Form onClose={() => setModalForm(false)} />
            </Modal>
            <div className="py-6 px-8">
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                    <div className=" py-3 flex flex-row justify-between items-center">
                        <button
                            onClick={() => setModalForm(true)}
                            className="bg-primary font-bold text-white py-2 px-3 rounded-md hover:bg-white hover:text-primary"
                        >
                            <span>Add</span>
                            <span>Tambah petugas</span>
                        </button>
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
                                <Tables.Th>Avatar</Tables.Th>
                                <Tables.Th>NIK</Tables.Th>
                                <Tables.Th>Nama Lengkap</Tables.Th>
                                <Tables.Th>Tempat lahir</Tables.Th>
                                <Tables.Th>Tangal lahir</Tables.Th>
                                <Tables.Th>email</Tables.Th>
                                <Tables.Th>Wilayah Kerja</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </Tables.Thead>
                        <tbody>
                            {petugas.length > 0 ? (
                                petugas.map((item, key) => (
                                    <Tables.Tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td>
                                            <img
                                                src={"/storage/" + item.avatar}
                                                alt=""
                                                className="w-12"
                                            />
                                        </Tables.Td>
                                        <Tables.Td>{item.nik}</Tables.Td>
                                        <Tables.Td>
                                            {item.nama_lengkap}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.tempat_lahir}
                                        </Tables.Td>
                                        <Tables.Td>
                                            {item.tanggal_lahir}
                                        </Tables.Td>
                                        <Tables.Td>{item.email}</Tables.Td>
                                        <Tables.Td>
                                            <div className="flex gap-1 flex-wrap">
                                                {item.area_kerja.map(
                                                    (data, i) => (
                                                        <p
                                                            className="py-1 px-2 rounded-md text-xs bg-gray-300 "
                                                            key={i}
                                                        >
                                                            {" " +
                                                                data.nama_wilayah +
                                                                ", "}
                                                        </p>
                                                    )
                                                )}
                                            </div>
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
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
