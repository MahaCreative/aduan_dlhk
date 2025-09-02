import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function FormReport(props) {
    const area_kerja = props.area_kerja;
    const jenis_pengaduan = props.jenis_pengaduan;
    const [filter, setFilter] = useState({
        jenis_pengaduan: "",
        area_kerja: "",
        status: "",
        dari_tanggal: "",
        sampai_tanggal: "",
    });

    const cetak = () => {
        router.get(route("cetak_laporan_pengaduan"), {
            ...filter,
        });
    };
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="bg-white overflow-hidden rounded-md">
                <div className="w-full bg-primary text-white py-3 px-3">
                    Filter Laporan Aduan
                </div>
                <p className="pt-6 py-3 px-4">
                    Kosongkan isian jika ingin menampilkan semua data aduan
                </p>
                <div className="px-4 py-4">
                    <div className="flex flex-row gap-x-3 px-4 py-4">
                        <div>
                            <InputLabel
                                value={"Jenis Pengaduan"}
                                htmlFor="jenis_pengaduan"
                            />
                            <select
                                className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                name="jenis_pengaduan"
                                id="jenis_pengaduan"
                                value={filter.jenis_pengaduan}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        jenis_pengaduan: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Jenis Pengaduan</option>
                                {jenis_pengaduan.map((item, key) => (
                                    <option value={item.id} key={key}>
                                        {item.nama}
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
                        <div>
                            <InputLabel
                                value={"Status Pengaduan"}
                                htmlFor="status_pengaduan"
                            />
                            <select
                                className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                name="status_pengaduan"
                                id="status_pengaduan"
                                value={filter.status}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="">Pilih Status</option>
                                <option value="di proses">di proses</option>
                                <option value="di batalkan">di batalkan</option>
                                <option value="selesai">selesai</option>
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
