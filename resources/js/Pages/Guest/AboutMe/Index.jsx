import GuestLayout from "@/Layouts/GuestLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Index() {
    const { profile } = usePage().props;
    return (
        <div>
            <div className="py-3 flex justify-center items-center h-[300px] bg-primary flex-col bg-[url('/storage/image/background2.png')] bg-contain bg-no-repeat">
                <h1 className="font-bold text-white text-3xl">
                    Tentang {profile.nama_instansi}
                </h1>
            </div>

            <div className="flex flex-col md:flex-row ">
                <div className="w-full px-4 md:px-8 lg:px-16 py-9">
                    <h1 className="my-3 text-primary font-bold text-xl md:text-3xl">
                        Tentang Kami
                    </h1>
                    <p
                        className=" text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: profile.keteragan }}
                    />
                </div>
                <div className="flex justify-center items-center py-6 bg-primary w-full">
                    <img src={"/storage/" + profile.logo} alt="" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row ">
                <div className="w-full px-4 md:px-8 lg:px-16 bg-primary py-9">
                    <h1 className="my-3 text-secondary font-bold text-xl md:text-3xl">
                        Sambutan Kepala Dinas
                    </h1>
                    <p
                        className=" text-base md:text-lg"
                        dangerouslySetInnerHTML={{ __html: profile.sambutan }}
                    />
                </div>
                <div className="flex justify-center items-center py-6 bg-secondary w-full">
                    <img src={"/storage/" + profile.foto_kadis} alt="" />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <GuestLayout children={page} />;
