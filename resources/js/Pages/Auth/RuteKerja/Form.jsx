import DrawMap from "@/Components/DrawMap";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";

import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import Swal from "sweetalert2";
import L from "leaflet";
export default function Form({ rute }) {
    const [color, setColor] = useState({ r: 242, g: 40, b: 12, a: 1 });
    const { data, setData, post, reset, errors } = useForm({
        nama_wilayah: "",
        geojson: "",
        geostring: "",
        kode_warna: "rgba(255,255,255,1)",
    });
    const [modalForm, setModalForm] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.store-rute-kerja"), {
            preserveScroll: true,
            onSuccess: () => {
                setModalForm(false);
                reset();
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil membuat peta wilayah kerja baru",
                    icon: "success",
                });
            },
            onError: (err) => {
                setModalForm(false);
                Swal.fire({
                    title: "Error",
                    text: "Upss... Gagal menambahkan peta wilayah kerja baru, silahkan periksa kembali isian anda",
                    icon: "error",
                    customClass: {
                        popup: "custom-swal",
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Lakukan sesuatu ketika tombol OK ditekan
                        setModalForm(true);
                        // Tambahkan fungsi atau aksi yang ingin dilakukan di sini
                    }
                });
            },
        });
    };

    return (
        <div className="px-6  w-[100%]">
            <Modal
                maxWidth="max-w-[500px]"
                show={modalForm}
                onClose={() => setModalForm(false)}
            >
                <form
                    onSubmit={submitHandler}
                    className="py-6 px-4 flex flex-col gap-3"
                >
                    <InputLabel value={"Nama Wilayah"} htmlFor="nama_wilayah" />
                    <TextInput
                        className="w-full"
                        name={"nama_wilayah"}
                        title={"Nama Wilayah"}
                        value={data.nama_wilayah}
                        onChange={(e) =>
                            setData({ ...data, nama_wilayah: e.target.value })
                        }
                    />
                    <InputError message={errors.nama_wilayah} />
                    <TextInput
                        className="w-full hidden"
                        disabled
                        title={"GeoJson Lokasi Wilayah"}
                        value={data.geostring}
                    />
                    <p className="font-semibold text-teal-500">
                        Silahkan Memilih Warna Wilayah
                    </p>
                    <TextInput
                        className="w-full"
                        disabled
                        title={"Kode Warna Lokasi"}
                        value={data.kode_warna}
                    />
                    <RgbaColorPicker
                        color={color}
                        onChange={(e) =>
                            setData({
                                ...data,
                                kode_warna: `rgba(${e.r}, ${e.g}, ${e.b}, ${
                                    Number.isNaN(e.a) ? 1 : e.a
                                })`,
                            })
                        }
                        style={{ width: "100%" }}
                    />
                    <div className="flex gap-3">
                        <button className="text-white py-2 px-4 rounded-md hover:bg-teal-800 bg-teal-600 transition-all duration-300 ease-in-out">
                            Simpan Wilayah
                        </button>
                        <button
                            type="button"
                            onClick={() => setModalForm(false)}
                            className="text-white py-2 px-4 rounded-md hover:bg-red-800 bg-red-600 transition-all duration-300 ease-in-out"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </Modal>
            <h3 className="text-teal-800 font-bold text-2xl">
                Silahkan Membuat Peta Wilayah Kerja
            </h3>

            <DrawMap
                rute={rute}
                data={data}
                setData={setData}
                setModal={setModalForm}
            />
        </div>
    );
}

Form.layout = (page) => (
    <AuthLayout children={page} title={"Buat Peta Wilayah "} />
);
