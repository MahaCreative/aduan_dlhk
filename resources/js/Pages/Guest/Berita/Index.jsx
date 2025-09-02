import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowDropDown, CalendarMonth, Face } from "@mui/icons-material";
import { debounce, pickBy } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

export default function Index(props) {
    const [params, setParams] = useState({ cari: "" });
    const berita = props.berita;
    const reload = useCallback(
        debounce((query) => {
            router.get("berita", pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true,
            });
        }, 450),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <Head title="Berita Kami" />
            <div className="py-3 flex justify-center items-center h-[300px] bg-primary flex-col  bg-[url('/storage/image/background2.png')] bg-contain bg-no-repeat">
                <h1 className="font-bold text-white text-3xl">
                    Cari Berita Kami
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
                    {berita.length > 0 && (
                        <div className="bg-secondary min-h-[600px] py-8 px-4 md:px-8 lg:px-16 bg-[url('/storage/image/background2.png')] bg-[contain] bg-left-bottom bg-no-repeat ">
                            <h1 className="text-primary text-center font-bold text-2xl">
                                Berita
                            </h1>
                            <duv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
                                {berita.map((item, key) => (
                                    <Link
                                        as="div"
                                        href={route("detail-berita", item.slug)}
                                        className="py-3 px-2 flex flex-row gap-x-2 bg-white rounded-md hover:cursor-pointer hover:bg-primary group"
                                    >
                                        <img
                                            src={"/storage/" + item.thumbnail}
                                            alt={item.judul_berita}
                                            className="w-[100px] h-[100px]"
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
                            </duv>
                            <div className="w-full flex flex-row  justify-center items-center py-6"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
