import React from 'react'
import Link from 'next/link';

const NavUserVendedor = () => {
    return (
        <>
            <Link className="hover:text-gray-400 transition-colors" href="/dashboard/products">
                Productos
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/dashboard/sales">
                Ventas
            </Link>
        </>
    )
}

export default NavUserVendedor