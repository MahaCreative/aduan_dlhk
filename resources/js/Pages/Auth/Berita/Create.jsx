import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Quill from "@/Components/Quill";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Create(props) {
    const imageRef = useRef();
    const { data, setData, post, reset, errors } = useForm({
        judul_berita: "",
        thumbnail: "",
        kontent: "",
    });
    const [preview, setPreview] = useState(null);
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, thumbnail: image }));
    };
    const imageClick = () => {
        imageRef.current.click();
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.store-kelola-berita"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Berhasil menyimpan 1 berita baru",
                    icon: "success",
                });
                reset();
                setPreview(null);
            },
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "gagal menyimpan 1 berita baru",
                    icon: "error",
                });
            },
        });
    };

    return (
        <div className="py-8 px-8">
            <div
                onClick={imageClick}
                className="relative w-full h-[350px] hover:cursor-pointer"
            >
                <img
                    src={
                        preview
                            ? preview
                            : "/storage/image/default_thumnbnail.jpg"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                />
                <input
                    ref={imageRef}
                    type="file"
                    hidden
                    onChange={changeImage}
                />
                <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                    {errors.thumbnail ? (
                        <p className="bg-red-500 text-white font-bold py-2 px-3 rounded-md">
                            {errors.thumbnail}
                        </p>
                    ) : (
                        <p className="bg-primary text-white font-bold py-2 px-3 rounded-md">
                            Klick Untuk Ganti Gambar
                        </p>
                    )}
                </div>
            </div>
            <div className="py-3 w-full">
                <div className="flex justify-between items-center gap-x-3">
                    <div className="w-full">
                        <InputLabel
                            value={"Judul Berita"}
                            htmlFor="judul_berita"
                        />
                        <TextInput
                            className="w-full"
                            value={data.judul_berita}
                            name="judul_berita"
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    judul_berita: e.target.value,
                                }))
                            }
                        />
                        <InputError message={errors.judul_berita} />
                        <InputLabel value={"Kontent"} htmlFor="kontent" />
                    </div>
                    <button
                        type="submit"
                        onClick={submitHandler}
                        className="bg-primary hover:bg-green-600 text-white py-2 px-3 rounded-md"
                    >
                        Simpan
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setPreview(null);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md"
                    >
                        Cancell
                    </button>
                </div>
                <div className="bg-white py-3 px-3">
                    <Quill
                        value={data.kontent}
                        onChange={(value) =>
                            setData((prev) => ({ ...prev, kontent: value }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}

Create.layout = (page) => <AuthLayout children={page} />;
