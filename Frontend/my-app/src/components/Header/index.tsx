import Link from 'next/link';
import React from 'react';
import './Header.css';
import NavDropdown from '../NavDropdown';
import { auth, signOut } from '@/auth';
import CartButton from '../CartButton';
import NavUserClient from './NavUserClient';
import NavUserVendedor from './NavUserVendedor';

export default async function Header() {
  const session = await auth();

  const isLogged = session?.user;
  const userRole = 'vendedor';
  /* const userRole = session?.user?.role; */

  const stylesClient = "header-nav flex py-2 justify-center w-full sticky top-0 z-10"
  const stylesVendedor = "header-nav flex py-2 justify-center w-full sticky top-0 z-10 bg-[#2a2a2a] text-gray-50"

  const navClient = "container mx-auto grid grid-cols-6 items-center px-6 py-4"
  const navVendedor = "container mx-auto grid grid-cols-6 items-center px-6 py-4 text-gray-50"

  /* className={userRole === 'vendedor' ? stylesVendedor : stylesClient} */
  return (
    <header className={userRole === 'vendedor' ? stylesVendedor : stylesClient} >
      <div className={userRole === 'vendedor' ? navVendedor : navClient}>
        {/* Logo */}
        <h1 className="text-xl font-bold col-span-1">
          <Link className="hover:text-gray-400 transition-colors" href="/">
            E-commerce
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex justify-center col-span-4 gap-6 font-bold">
          {userRole === 'vendedor' ? (
            <NavUserVendedor />
          ) : (
            <NavUserClient />
          )}
        </nav>

        {/* Auth Buttons */}
        {!isLogged ? (
          <div className="flex justify-end gap-4 col-span-1">
            <Link
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow hover:bg-gray-100 transition-all"
              href="/login"
            >
              Iniciar Sesión
            </Link>
            <Link
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow hover:bg-gray-600 transition-all"
              href="/register"
            >
              Registrarse
            </Link>
          </div>
        ) : (
          <div className="flex justify-end items-center gap-6 col-span-1">
            <CartButton />
            <NavDropdown />
          </div>
        )}
      </div>
    </header>
  );
}
