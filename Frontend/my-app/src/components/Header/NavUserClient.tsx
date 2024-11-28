import React from 'react'
import Link from 'next/link';

const NavUserClient = () => {
    return (
        <>
            <Link className="hover:text-gray-400 transition-colors" href="/">
                Home
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/products">
                Productos
            </Link>
            <Link className="hover:text-gray-400 transition-colors" href="/about">
                Nosotros
            </Link>
        </>
    )
}

export default NavUserClient