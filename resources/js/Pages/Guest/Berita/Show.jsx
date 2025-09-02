import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowDropDown, CalendarMonth, Face } from "@mui/icons-material";
import { debounce, pickBy } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

export default function Show(props) {
    const [params, setParams] = useState({ cari: "" });
    const galery = props.galery;
    const berita = props.berita;

    const submitEnter = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            router.get(route("berita", { cari: params.cari }));
        }
    };

    return (
        <div>
            <Head title={"Hy"} />
            <div className="py-3 flex justify-center items-center h-[300px] bg-primary flex-col  bg-[url('/storage/image/background2.png')] bg-contain bg-no-repeat">
                <h1 className="font-bold text-white text-3xl">
                    Cari Galery Kami
                </h1>
                <div className="px-4 md:px-8 lg:px-16 my-6 w-full">
                    <TextInput
                        onKeyDown={submitEnter}
                        value={params.cari}
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        className="w-full "
                        placeholder="Cari berdasarkan judul..."
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-x-2 items-start">
                <div className="w-full px-4 md:px-8 lg:px-16 py-12">
                    <img
                        src={"/storage/" + berita.thumbnail}
                        alt=""
                        className="w-full h-[400px] object-cover"
                    />
                    <div className="my-4">
                        <h1 className="font-bold text-2xl tracking-tight text-primary capitalize group-hover:text-secondary">
                            {berita.judul_berita}
                        </h1>
                        <div className="flex gap-x-3 text-primary my-3">
                            <div className="font-light text-sm capitalize leading-3">
                                <span className="mx-3">
                                    <Face />
                                </span>
                                <span>{berita.user.nama_lengkap}</span>
                            </div>
                            <div className="font-light text-sm capitalize leading-3">
                                <span>
                                    <CalendarMonth />
                                </span>
                                {moment(berita.created_at).format("ll")}
                            </div>
                        </div>
                        <p
                            className="tracking-tight font-light text-sm line-clamp-3"
                            dangerouslySetInnerHTML={{
                                __html: berita.kontent,
                            }}
                        ></p>
                    </div>
                </div>
                <div className="w-full md:w-[50%] py-12">
                    <h1 className="bg-primary text-secondary py-2 px-4 font-bold text-2xl inline-block">
                        Galery Terbaru
                    </h1>
                    {galery.length > 0 && (
                        <>
                            <div className="py-4 px-3">
                                {galery.map((item, key) => (
                                    <Link
                                        as="div"
                                        href={route("detail-berita", item.slug)}
                                        className="py-3  my-2 px-2 flex flex-row gap-x-2 bg-white rounded-md hover:cursor-pointer hover:bg-secondary"
                                    >
                                        <img
                                            src={"/storage/" + item.thumbnail}
                                            alt={item.judul_berita}
                                            className="w-[100px] h-[100px]"
                                        />
                                        <div>
                                            <h1 className="font-bold text-lg tracking-tight text-primary capitalize">
                                                {item.judul_berita}
                                            </h1>
                                            <div className="flex gap-x-3 text-primary">
                                                <div className="font-light text-sm capitalize leading-3">
                                                    <span className="mx-3">
                                                        <Face />
                                                    </span>
                                                    <span>
                                                        {item.user.nama_lengkap}
                                                    </span>
                                                </div>
                                                <div className="font-light text-sm capitalize leading-3">
                                                    <span>
                                                        <CalendarMonth />
                                                    </span>
                                                    {moment(
                                                        item.created_at
                                                    ).format("ll")}
                                                </div>
                                            </div>
                                            <p
                                                className="tracking-tight font-light text-sm line-clamp-3 py-4"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.kontent,
                                                }}
                                            ></p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <GuestLayout children={page} />;
