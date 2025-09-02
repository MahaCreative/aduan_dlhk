import React from "react";

function Tables({ children }) {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-secondary">
                    {children}
                </table>
            </div>
        </>
    );
}

function Thead({ children }) {
    return (
        <thead className="text-xs text-secondary uppercase bg-primary ">
            {children}
        </thead>
    );
}

function Th({ children }) {
    return (
        <th scope="col" className="px-6 py-3 capitalize">
            {children}
        </th>
    );
}

function Tr({ children }) {
    return (
        <tr className="bg-white odd:bg-gray-100 border-b  border-secondary">
            {children}
        </tr>
    );
}

function Td({ children, ...props }) {
    return (
        <td {...props} className="px-6 py-4 capitalize text-black">
            {children}
        </td>
    );
}

Tables.Thead = Thead;
Tables.Th = Th;
Tables.Tr = Tr;
Tables.Td = Td;
export default Tables;
