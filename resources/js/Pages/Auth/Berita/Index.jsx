import Tables from "@/Components/Tables";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link } from "@inertiajs/react";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";

export default function Index(props) {
    const berita = props.berita;
    const [params, setParams] = useState({ cari: "" });
    return (
        <>
            <Head title="Kelola Berita" />
            <div className="py-6 px-8">
                <div className="bg-white py-2 px-4 rounded-md drop-shadow-md">
                    <div className=" py-3 flex flex-row justify-between items-center">
                        <Link
                            href={route("auth.create-kelola-berita")}
                            className="bg-primary font-bold text-white py-2 px-3 rounded-md hover:bg-white hover:text-primary"
                        >
                            <span>
                                <Add />
                            </span>
                            <span>Tambah Berita</span>
                        </Link>
                        <div className="flex gap-3">
                            <input
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        cari: e.target.value,
                                    })
                                }
                                value={params.cari}
                                placeholder="Cari Petugas...."
                                type="text"
                                className="bg-secondary text-primary rounded-md outline-none border-none ring-0 focus:ring-0 focus:border-none focus:outline-primary"
                            />
                        </div>
                    </div>
                    <Tables>
                        <Tables.Thead>
                            <tr>
                                <Tables.Th>#</Tables.Th>
                                <Tables.Th>Thumbnail</Tables.Th>
                                <Tables.Th>Judul</Tables.Th>
                                <Tables.Th>Kontent</Tables.Th>
                                <Tables.Th>Jmlh Views</Tables.Th>
                                <Tables.Th>Status</Tables.Th>
                                <Tables.Th>Created At</Tables.Th>
                                <Tables.Th>Post By</Tables.Th>
                                <Tables.Th>Aksi</Tables.Th>
                            </tr>
                        </Tables.Thead>
                        <tbody>
                            {berita.length > 0 ? (
                                berita.map((item, key) => (
                                    <Tables.Tr key={key}>
                                        <Tables.Td>{key + 1}</Tables.Td>
                                        <Tables.Td>
                                            <img
                                                src={
                                                    "/storage/" + item.thumbnail
                                                }
                                                alt=""
                                                className="w-12"
                                            />
                                        </Tables.Td>
                                        <Tables.Td>
                                            <Link href={item.slug}>
                                                {item.judul_berita}
                                            </Link>
                                        </Tables.Td>
                                        <Tables.Td>
                                            <p
                                                className="line-clamp-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.kontent,
                                                }}
                                            />
                                        </Tables.Td>
                                        <Tables.Td>{item.views}</Tables.Td>
                                        <Tables.Td>{item.status}</Tables.Td>
                                        <Tables.Td>{item.created_at}</Tables.Td>
                                        <Tables.Td>
                                            {item.user.nama_lengkap}
                                        </Tables.Td>

                                        <Tables.Td>
                                            <Link
                                                href={route(
                                                    "auth.delete-kelola-berita",
                                                    item.slug
                                                )}
                                                method="delete"
                                                as="button"
                                                className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md text-white"
                                            >
                                                Delete
                                            </Link>
                                            <Link
                                                as="button"
                                                href={route(
                                                    "auth.edit-kelola-berita",
                                                    item.slug
                                                )}
                                                className="bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-md text-white"
                                            >
                                                Edit
                                            </Link>
                                        </Tables.Td>
                                    </Tables.Tr>
                                ))
                            ) : (
                                <Tables.Tr>
                                    <Tables.Td colspan={9}>
                                        <p className="w-full text-center">
                                            Belum ada data yang ditambahkan
                                        </p>
                                    </Tables.Td>
                                </Tables.Tr>
                            )}
                        </tbody>
                    </Tables>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <AuthLayout children={page} />;
