import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowDropDown, CalendarMonth, Face } from "@mui/icons-material";
import { debounce, pickBy } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const [params, setParams] = useState({ cari: "" });
    const galery = props.galery;
    const reload = useCallback(
        debounce((query) => {
            router.get("galery", pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true,
            });
        }, 450),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <Head title="Galery Kami" />
            <div className="py-3 flex justify-center items-center h-[300px] bg-primary flex-col  bg-[url('/storage/image/background2.png')] bg-contain bg-no-repeat">
                <h1 className="font-bold text-white text-3xl">
                    Cari Galery Kami
                </h1>
                <div className="px-4 md:px-8 lg:px-16 my-6 w-full">
                    <TextInput
                        value={params.cari}
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        className="w-full "
                        placeholder="Cari berdasarkan judul..."
                    />
                </div>
            </div>

            <div className="flex gap-x-3 items-start">
                <div className="w-full">
                    {galery.length > 0 && (
                        <div className="bg-secondary min-h-[600px] py-8 px-4 md:px-8 lg:px-16 bg-[url('/storage/image/background2.png')] bg-[contain] bg-left-bottom bg-no-repeat ">
                            <h1 className="text-primary text-center font-bold text-2xl">
                                Galery
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
                                {galery.map((item, key) => (
                                    <Link
                                        as="div"
                                        href={route("detail-galery", item.slug)}
                                        className="py-3 px-2 flex flex-row gap-x-2 bg-white rounded-md hover:cursor-pointer hover:bg-primary group"
                                    >
                                        <img
                                            src={"/storage/" + item.thumbnail}
                                            alt={item.judul_berita}
                                            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded"
                                        />
                                        <div>
                                            <h1 className="font-bold text-lg tracking-tight text-primary capitalize group-hover:text-secondary">
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
                                                className="tracking-tight font-light text-sm line-clamp-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.kontent,
                                                }}
                                            ></p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="w-full flex flex-row  justify-center items-center py-6"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
