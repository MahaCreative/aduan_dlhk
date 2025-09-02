import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

export default function Detail(props) {
    const { auth } = usePage().props;
    const pengaduan = props.pengaduan;
    const { data, setData, post, reset, errors } = useForm({
        kd_pengaduan: "",
        area_kerja_id: "",
        nama_pelapor: "",
        judul_pengaduan: "",
        deskripsi_pengaduan: "",
        foto_pengaduan: "",
        telph: "",
        jenis_pengaduan_id: "",
        jenis_pengaduan: "",
        wilayah: "",
        lat: "",
        long: "",
        nama_petugas: "",
        tanggal_penanganan: "",
        status_pengaduan: "",
        status_lapangan: "",
        solusi_pengangan: "",
        foto_penanganan: "",
    });
    const [preview, setPreview] = useState(null);
    const imageRef = useRef();
    const changeImage = (e) => {
        let image = e.target.files[0];
        setPreview(URL.createObjectURL(image));
        setData((prev) => ({ ...prev, foto_penanganan: image }));
    };

    const submitHandler = (e) => {
        post(route("auth.proses-pengaduan", pengaduan.kd_pengaduan));
    };
    useEffect(() => {
        if (pengaduan.foto_penanganan) {
            setPreview("/storage/" + pengaduan.foto_penanganan);
        }
        setData({
            ...data,
            kd_pengaduan: pengaduan.kd_pengaduan,
            area_kerja_id: pengaduan.area_kerja_id,
            nama_pelapor: pengaduan.nama_pelapor,
            judul_pengaduan: pengaduan.judul_pengaduan,
            deskripsi_pengaduan: pengaduan.deskripsi_pengaduan,
            foto_pengaduan: pengaduan.foto_pengaduan,
            telph: pengaduan.telph,
            jenis_pengaduan_id: pengaduan.jenis_pengaduan_id,
            jenis_pengaduan: pengaduan.jenis_pengaduan.nama,
            wilayah: pengaduan.area.nama_wilayah,
            lat: pengaduan.lat,
            long: pengaduan.long,
            nama_petugas: auth.user.nama_lengkap,
            tanggal_penanganan: moment(new Date()).format("LL"),
            status_pengaduan: pengaduan.status_pengaduan,
            status_lapangan: pengaduan.status_lapangan,
            solusi_pengangan: pengaduan.solusi_pengangan,
            foto_penanganan: "",
        });
    }, []);

    return (
        <div className="py-6 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full py-2 px-3 bg-white rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                    <h1 className="my-3 font-bold text-primary">
                        Data Pengaduan
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                        <div action="" className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="w-full">
                                    <InputLabel value={"Kode Pengaduan"} />
                                    <TextInput
                                        disabled
                                        className="w-full"
                                        value={pengaduan.kd_pengaduan}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel value={"Tanggal Pengaduan"} />
                                    <TextInput
                                        className="w-full"
                                        disabled
                                        value={moment(
                                            pengaduan.created_at
                                        ).format("LL")}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel value={"Judul Pengaduan"} />
                                    <TextInput
                                        disabled
                                        className="w-full"
                                        value={data.judul_pengaduan}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel value={"Telp (WA) Pelapor"} />
                                    <TextInput
                                        className="w-full"
                                        disabled
                                        value={data.telph}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel value={"Jenis Pengaduan"} />
                                    <TextInput
                                        disabled
                                        className="w-full"
                                        value={data.jenis_pengaduan}
                                    />
                                </div>
                            </div>
                            <div className="my-2">
                                <InputLabel value={"Deskripsi Pengaduan"} />
                                <TextInput
                                    disabled
                                    className="w-full"
                                    value={data.deskripsi_pengaduan}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hover:cursor-pointer bg-white py-3 px-4 rounded-md">
                    <h1 className="my-3 font-bold text-primary">
                        Foto Pengaduan
                    </h1>
                    <img
                        src={"/storage/" + pengaduan.foto_pengaduan}
                        alt=""
                        className="w-[400px] h-[200px] object-cover"
                    />
                </div>
            </div>
            <div className="my-4 flex flex-col md:flex-row justify-between items-start gap-3">
                <div className="w-full py-2 px-3 bg-white rounded-md shadow-md shadow-gray-500/50 min-h-[260px] max-h-[500px] overflow-y-auto">
                    <h1 className="my-3 font-bold text-primary">
                        Proses Penanganan
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-3">
                        <div action="" className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="w-full">
                                    <InputLabel value={"Tanggal Penaganan"} />
                                    <TextInput
                                        disabled
                                        className="w-full"
                                        value={data.tanggal_penanganan}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel value={"Nama Petugas"} />
                                    <TextInput
                                        className="w-full"
                                        disabled
                                        value={data.nama_petugas}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        value={"Status Pengaduan"}
                                        htmlFor="status_pengaduan"
                                    />
                                    <select
                                        className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                        name="status_pengaduan"
                                        id="status_pengaduan"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                status_pengaduan:
                                                    e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            {data.status_pengaduan}
                                        </option>
                                        <option value="di proses">
                                            di proses
                                        </option>
                                        <option value="di batalkan">
                                            di batalkan
                                        </option>
                                        <option value="selesai">selesai</option>
                                    </select>
                                    <InputError
                                        message={errors.status_pengaduan}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputLabel
                                        value={"Status Lapangan"}
                                        htmlFor="status_lapangan"
                                    />
                                    <select
                                        className="disabled:bg-gray-100 border-gray-300 focus:border-secondary focus:ring-secondary rounded-md shadow-sm  w-full capitalize"
                                        name="status_lapangan"
                                        id="status_lapangan"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                status_lapangan: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="" disabled>
                                            {data.status_lapangan}
                                        </option>
                                        <option value="sesuai fakta">
                                            Sesuai Fakta
                                        </option>
                                        <option value="tidak sesuai">
                                            Tidak sesuai fakta
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.status_lapangan}
                                    />
                                </div>
                            </div>
                            <div className="my-2">
                                <InputLabel
                                    value={"Deskripsi penanganan"}
                                    htmlFor={"solusi_penanganan"}
                                />
                                <TextInput
                                    name="solusi_penanganan"
                                    className="w-full"
                                    value={data.solusi_pengangan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            solusi_pengangan: e.target.value,
                                        })
                                    }
                                />
                                <InputError message={errors.solusi_pengangan} />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => submitHandler()}
                        className="bg-primary text-white py-3 px-4 rounded-md"
                    >
                        Proses Pengaduan
                    </button>
                </div>
                <div
                    onClick={() => imageRef?.current.click()}
                    className="relative hover:cursor-pointer"
                >
                    <img
                        src={
                            preview
                                ? preview
                                : "/storage/image/default_thumnbnail.jpg"
                        }
                        alt=""
                        className="w-[400px] h-[200px] object-cover"
                    />
                    <input
                        type="file"
                        onChange={changeImage}
                        ref={imageRef}
                        hidden
                    />
                    <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                        {errors.foto_penanganan ? (
                            <div className="bg-white py-1.5 px-2.5">
                                <InputError message={errors.foto_penanganan} />
                            </div>
                        ) : (
                            preview == null && (
                                <p className="text-xs text-white font-light bg-primary py-1.5 px-2.5 rounded-md">
                                    Click untuk memasukkan foto bukti pengecekan
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
