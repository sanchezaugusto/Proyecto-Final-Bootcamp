import React from 'react'
import Link from 'next/link';

const NavUserVendedor = () => {
    return (
        <>
            <Link className="hover:text-gray-400 transition-colors" href="/">
                Productos
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/">
                Ventas
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/">
                Perfil
            </Link>
        </>
    )
}

export default NavUserVendedor