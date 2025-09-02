import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Maps from "@/Components/Maps";
import Quill from "@/Components/Quill";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import Swal from "sweetalert2";

export default function Index(props) {
    const profileInstansi = props.profileInstansi;
    const [previewLogo, setPreviewLogo] = useState(null);
    const [previewKadis, setPreviewKadis] = useState(null);
    const logoRef = useRef();
    const kadisRef = useRef();
    const { data, setData, post, reset, errors } = useForm({
        nama_instansi: "",
        nama_kadis: "",
        foto_kadis: "",
        alamat: "",
        logo: "",
        lat: "",
        long: "",
        keteragan: "",
        sambutan: "",
        email: "",
        phone: "",
    });
    const resetData = () => {
        setData({
            ...data,
            nama_instansi: profileInstansi.nama_instansi,
            nama_kadis: profileInstansi.nama_kadis,
            foto_kadis: profileInstansi.foto_kadis,
            alamat: profileInstansi.alamat,
            logo: profileInstansi.logo,
            lat: profileInstansi.lat,
            long: profileInstansi.long,
            keteragan: profileInstansi.keteragan,
            sambutan: profileInstansi.sambutan,
            email: profileInstansi.email,
            phone: profileInstansi.phone,
        });
        setPreviewKadis("/storage/" + profileInstansi.foto_kadis);
        setPreviewLogo("/storage/" + profileInstansi.logo);
    };
    useEffect(() => {
        setData({
            ...data,
            nama_instansi: profileInstansi.nama_instansi,
            nama_kadis: profileInstansi.nama_kadis,
            foto_kadis: profileInstansi.foto_kadis,
            alamat: profileInstansi.alamat,
            logo: profileInstansi.logo,
            lat: profileInstansi.lat,
            long: profileInstansi.long,
            keteragan: profileInstansi.keteragan,
            sambutan: profileInstansi.sambutan,
            email: profileInstansi.email,
            phone: profileInstansi.phone,
        });
        setPreviewKadis("/storage/" + profileInstansi.foto_kadis);
        setPreviewLogo("/storage/" + profileInstansi.logo);
    }, []);
    const changeLogo = (e) => {
        let image = e.target.files[0];
        setPreviewLogo(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, logo: image }));
    };
    const changeKadis = (e) => {
        let image = e.target.files[0];
        setPreviewKadis(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, foto_kadis: image }));
    };
    const logoClick = () => {
        logoRef.current.click();
    };
    const kadisClick = () => {
        kadisRef.current.click();
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("auth.update-profile-instansi"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "berhasil memperbaharui profile instansi",
                    icon: "success",
                });
            },
            onError: (err) => {
                console.log(err);

                Swal.fire({
                    title: "Error",
                    text: "gagal memperbaharui profile instansi",
                    icon: "error",
                });
            },
        });
    };
    return (
        <div className="py-6 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div
                    onClick={() => logoClick()}
                    className="relative hover:cursor-pointer py-2 px-3 rounded-md bg-white border-primary border w-full"
                >
                    <h1>Logo Instansi</h1>
                    <img
                        src={previewLogo}
                        alt=""
                        className="w-full h-[400px] object-cover"
                    />
                    <input
                        type="file"
                        hidden
                        ref={logoRef}
                        onChange={changeLogo}
                    />
                </div>
                <div
                    onClick={() => kadisClick()}
                    className="relative hover:cursor-pointer py-2 px-3 rounded-md bg-white border-primary border w-full"
                >
                    <h1>Foto Kepala Dinas</h1>
                    <img
                        src={previewKadis}
                        alt=""
                        className="w-full h-[400px] object-cover"
                    />
                    <input
                        type="file"
                        hidden
                        ref={kadisRef}
                        onChange={changeKadis}
                    />
                </div>
                <form
                    onSubmit={submitHandler}
                    className="py-2 px-3 rounded-md bg-white border-primary border w-full"
                >
                    <div className="w-full">
                        <InputLabel
                            value={"Nama Instansi"}
                            htmlFor="nama_instansi"
                        />
                        <TextInput
                            className="w-full"
                            name="nama_instansi"
                            value={data.nama_instansi}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.nama_instansi} />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            value={"Nama Kepala Dinas"}
                            htmlFor="nama_kadis"
                        />
                        <TextInput
                            className="w-full"
                            name="nama_kadis"
                            value={data.nama_kadis}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.nama_kadis} />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            value={"Alamat Instansi"}
                            htmlFor="alamat"
                        />
                        <TextInput
                            className="w-full"
                            name="alamat"
                            value={data.alamat}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.alamat} />
                    </div>
                    <div className="w-full">
                        <InputLabel value={"Email Instansi"} htmlFor="email" />
                        <TextInput
                            className="w-full"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="w-full">
                        <InputLabel value={"Telp Instansi"} htmlFor="phone" />
                        <TextInput
                            className="w-full"
                            name="phone"
                            value={data.phone}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="py-3 flex gap-x-3 items-center">
                        <button
                            type="submit"
                            className="text-white font-medium py-2 px-3 rounded-md bg-primary hover:bg-green-600"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={resetData}
                            type="button"
                            className="text-white font-medium py-2 px-3 rounded-md bg-red-500 hover:bg-red-600"
                        >
                            Cancell
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 my-2 py-3 px-4 ">
                <div className="bg-white py-3 px-4 min-h-[300px] max-h-[500px] overflow-auto w-full">
                    <h1>Deskripsi Instansi</h1>
                    <InputError message={errors.keteragan} />
                    <Quill
                        onChange={(value) =>
                            setData((prev) => ({ ...prev, keteragan: value }))
                        }
                        value={data.keteragan}
                    />
                </div>
                <div className="bg-white py-3 px-4 min-h-[300px] max-h-[500px] overflow-auto w-full">
                    <h1>Sambutan Kepala Dinas</h1>
                    <InputError message={errors.sambutan} />
                    <Quill
                        value={data.sambutan}
                        onChange={(value) =>
                            setData((prev) => ({ ...prev, sambutan: value }))
                        }
                    />
                </div>
            </div>
            <div className="min-h-[300px] w-full">
                <p className="my-3 font-light">
                    Tekan 2 kali pada maps untuk mengatur lokasi kantor
                </p>
                <Maps
                    onMapClick={({ lat, lng }) =>
                        setData({ ...data, lat: lat, long: lng })
                    }
                    zoom={15} // onMapClick={handleMapClick}
                    position={[data.lat, data.long]}
                    style={{
                        height: "350px",
                        width: "100%",
                        margin: "auto",
                        overflow: "hidden", // pastikan overflow tersembunyi
                    }}
                >
                    <Marker position={[data.lat, data.long]}></Marker>
                </Maps>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
