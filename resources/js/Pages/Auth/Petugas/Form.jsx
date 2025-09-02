import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ResponseAlert from "@/Hook/ResponseAlert";
import { useForm, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";

export default function Form({ model, onClose }) {
    const { showResponse } = ResponseAlert();
    const imageRef = useRef();
    const { area_kerja } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        email: "",
        telp: "",
        password: "",
        avatar: "",
        area_kerja_id: [], // PENTING! Harus array kosong, bukan undefined
    });
    const [preview, setPreview] = useState(null);
    const imageClick = () => {
        imageRef?.current.click();
    };
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, avatar: image }));
    };
    const handleCheckboxChange = (e) => {
        const id = parseInt(e.target.value); // ID area kerja dalam bentuk angka
        const checked = e.target.checked;

        if (checked) {
            // Tambahkan ID ke array jika dicentang
            setData("area_kerja_id", [...data.area_kerja_id, id]);
        } else {
            // Hapus ID dari array jika dilepas
            setData(
                "area_kerja_id",
                data.area_kerja_id.filter((val) => val !== id)
            );
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.store-petugas"), {
            onSuccess: () => {
                showResponse(
                    "success",
                    "Berhasil",
                    "Berhasil menambahkan data petugas baru"
                );
                onClose();
            },
            onError: (err) => {
                showResponse(
                    "error",
                    "Gagal",
                    "Gagal menambahkan data petugas"
                );
            },
        });
    };
    return (
        <form onSubmit={submitHandler}>
            <div className="w-full flex flex-col md:flex-row gap-x-3 items-start">
                <div
                    onClick={() => imageClick()}
                    className="relative w-full  md:w-[500px] h-[200px] hover:cursor-pointer"
                >
                    <img
                        src={
                            preview
                                ? preview
                                : "/storage/image/default_profile.png"
                        }
                        alt=""
                        className="h-full w-full object-cover"
                    />
                    <input
                        hidden
                        type="file"
                        onChange={changeImage}
                        ref={imageRef}
                    />
                    <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                        {errors.avatar ? (
                            <div className="bg-white py-1.5 px-2.5">
                                <InputError message={errors.avatar} />
                            </div>
                        ) : (
                            preview == null && (
                                <p className="text-xs text-white font-light bg-primary py-1.5 px-2.5 rounded-md">
                                    Click untuk ganti gambar
                                </p>
                            )
                        )}
                    </div>
                </div>
                <div className="w-full min-h-[250px] py-2 px-3 rounded-md border border-primary shadow-md">
                    <h1 className="my-3 text-primary font-medium">
                        Profile Pegawai
                    </h1>
                    <div className="flex jusitify-between gap-x-2">
                        <div className="w-full">
                            <InputLabel htmlFor={"nik"} value={"NIK Pegawai"} />
                            <TextInput
                                className="w-full"
                                name="nik"
                                isFocused={true}
                                value={data.nik}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.nik} />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor={"nama_lengkap"}
                                value={"Nama Pegawai"}
                            />
                            <TextInput
                                className="w-full"
                                name="nama_lengkap"
                                isFocused={true}
                                value={data.nama_lengkap}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.nama_lengkap} />
                        </div>
                        <div className="w-full">
                            <InputLabel htmlFor={"telp"} value={"Telp (WA)"} />
                            <TextInput
                                className="w-full"
                                name="telp"
                                isFocused={true}
                                value={data.telp}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.telp} />
                        </div>
                    </div>
                    <div className="flex jusitify-between gap-x-2">
                        <div className="w-full">
                            <InputLabel
                                htmlFor={"tempat_lahir"}
                                value={"Tempat lahir"}
                            />
                            <TextInput
                                className="w-full"
                                name="tempat_lahir"
                                isFocused={true}
                                value={data.tempat_lahir}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.tempat_lahir} />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor={"tanggal_lahir"}
                                value={"Tanggal Lahir"}
                            />
                            <TextInput
                                className="w-full"
                                type={"date"}
                                name="tanggal_lahir"
                                isFocused={true}
                                value={data.tanggal_lahir}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.tanggal_lahir} />
                        </div>
                    </div>
                    <div className="flex jusitify-between gap-x-2">
                        <div className="w-full">
                            <InputLabel htmlFor={"email"} value={"Email"} />
                            <TextInput
                                className="w-full"
                                type={"email"}
                                name="email"
                                isFocused={true}
                                value={data.email}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="w-full">
                            <InputLabel
                                htmlFor={"password"}
                                value={"Password"}
                            />
                            <TextInput
                                className="w-full"
                                type={"password"}
                                name="password"
                                isFocused={true}
                                value={data.password}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <InputError message={errors.password} />
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-[250px] py-2 px-3 rounded-md border border-primary shadow-md">
                    <h1 className="my-3 text-primary font-medium">
                        Area Kerja Pegawai
                    </h1>
                    <p className="text-sm font-light tracking-tight">
                        Sebelum menambahkan petugas, anda harus memberikan area
                        kerja petugas yang ingin ditambahkan, silahkan centang
                        untuk memberikan petugas area kerja
                    </p>
                    <div className="flex flex-wrap gap-x-2">
                        {area_kerja.map((item, key) => (
                            <div>
                                <div
                                    className="flex items-center gap-x-2"
                                    key={item.id}
                                >
                                    <TextInput
                                        type="checkbox"
                                        name={item.id}
                                        value={item.id}
                                        checked={data.area_kerja_id.includes(
                                            item.id
                                        )}
                                        onChange={handleCheckboxChange}
                                    />
                                    <InputLabel
                                        htmlFor={item.id}
                                        value={item.nama_wilayah}
                                    />
                                </div>
                                <InputError
                                    message={errors[`area_kerja_id.${key}`]}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-x-3 items-center py-5 justify-end">
                <button className="bg-primary hover:bg-green-700 py-2 px-4 rounded-md text-white">
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        reset();
                    }}
                    className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md text-white"
                >
                    Cancell
                </button>
            </div>
        </form>
    );
}
