import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function FormReport(props) {
    const area_kerja = props.area_kerja;
    const petugas = props.petugas;
    const [filter, setFilter] = useState({
        area_kerja: "",
        petugas: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });

    const cetak = () => {
        router.get(route("cetak_peta_tempat_sampah"), {
            ...filter,
        });
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="bg-white overflow-hidden rounded-md">
                <div className="w-full bg-primary text-white py-3 px-3">
                    Filter Laporan Peta Sampah
                </div>
                <p className="pt-6 py-3 px-4">
                    Kosongkan isian jika ingin menampilkan semua data aduan
                </p>
                <div className="px-4 py-4">
                    <div className="flex flex-row gap-x-3 px-4 py-4">
                        <div>
                            <InputLabel
                                value={"Ditambahkan Oleh"}
                                htmlFor="petugas"
                            />
                            <select
                                className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                name="petugas"
                                id="petugas"
                                value={filter.petugas}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        petugas: e.target.value,
                                    })
                                }
                            >
                                <option value="">
                                    Pilih Petugas Yang Menambahkan Peta
                                </option>
                                {petugas.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.nama_lengkap}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <InputLabel
                                value={"Area Kerja"}
                                htmlFor="area_kerja"
                            />
                            <select
                                className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                name="area_kerja"
                                id="area_kerja"
                                value={filter.area_kerja}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        area_kerja: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Area Kerja</option>
                                {area_kerja.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.nama_wilayah}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-3 px-4 py-4">
                        <div className="w-full">
                            <InputLabel
                                value={"Dari Tanggal"}
                                htmlFor="dari_tanggal"
                            />
                            <TextInput
                                className="w-full"
                                name="dari_tanggal"
                                type="date"
                                value={filter.dari_tanggal}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        dari_tanggal: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                value={"Sampai Tanggal"}
                                htmlFor="sampai_tanggal"
                            />
                            <TextInput
                                className="w-full"
                                name="sampai_tanggal"
                                type="date"
                                value={filter.sampai_tanggal}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        sampai_tanggal: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <button
                        onClick={cetak}
                        className="bg-primary text-white py-2 px-3 rounded-md"
                    >
                        Cetak Laporan
                    </button>
                </div>
            </div>
        </div>
    );
}

FormReport.layout = (page) => <AuthLayout children={page} />;
