import React from 'react'
import Link from 'next/link';

const NavUserClient = () => {
    return (
        <>
            <Link className="hover:text-gray-400 transition-colors" href="/">
                Inicio
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/products">
                Productos
            </Link>
        </>
    )
}

export default NavUserClient