import AuthLayout from "@/Layouts/AuthLayout";
import { Face2, Group, LocalActivity, TramSharp } from "@mui/icons-material";
import React from "react";

export default function Index(props) {
    const count = props.count;

    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <LocalActivity color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.rute_kerja}
                        </p>
                        <p className="font-light text-xs">Jumlah Area Kerja</p>
                    </div>
                </div>
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <TramSharp color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.peta_sampah}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Peta Sampah Ditambahkan
                        </p>
                    </div>
                </div>
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <Group color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.petugas}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Petugas Terdaftar
                        </p>
                    </div>
                </div>
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <Face2 color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.masyarakat}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Masyarakat Terdaftar
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid my-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <LocalActivity color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.pengaduan_harian}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Aduah Hari Ini
                        </p>
                    </div>
                </div>
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <TramSharp color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.pengaduan_bulanan}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Aduah Bulan Ini
                        </p>
                    </div>
                </div>
                <div className="bg-primary text-white flex rounded-md py-3 px-4 justify-between items-center">
                    <div className="py-3 px-4 text-6xl">
                        <Group color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-7xl">
                            {count.pengaduan_tahunan}
                        </p>
                        <p className="font-light text-xs">
                            Jumlah Aduah Tahun Ini
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
