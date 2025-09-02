import { usePage } from "@inertiajs/react";
import { InsertEmoticon } from "@mui/icons-material";
import React from "react";

export default function CetakLayout({ children }) {
    const { profile } = usePage().props;
    return (
        <div className="w-full h-screen bg-white">
            <div className="w-full flex flex-col justify-center items-center py-6">
                <div className="flex items-center justify-between flex-row w-full  border-b border-black py-2">
                    <div className="px-8 w-[200px] bg-red-50">
                        <img
                            src={"/storage/" + profile.logo}
                            alt=""
                            className=" w-[200px]"
                        />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="uppercase font-bold text-3xl">
                            {profile.nama_instansi}
                        </h1>
                        <p className="capitalize font-light ">
                            {profile.alamat}
                        </p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}
