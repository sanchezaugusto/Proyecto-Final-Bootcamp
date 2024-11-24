import Link from 'next/link';
import React from 'react';
import './Header.css'
import { auth, signOut } from '@/auth';

export default async function Header() {
  const session = await auth()

  const isLogged = session?.user
  console.log(isLogged)
  return (
    <header className='header-nav flex py-2 justify-center w-full sticky top-0 z-10'>
      <div className="container mx-auto grid grid-cols-6 items-center px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold col-span-1">
          <Link className="hover:text-gray-400 transition-colors" href="/">
            E-commerce
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex justify-center col-span-4 gap-6 font-bold">
          <Link className="hover:text-gray-400 transition-colors" href="/">
            Home
          </Link>
          <Link className="hover:text-gray-400 transition-colors" href="/products">
            Productos
          </Link>
          <Link className="hover:text-gray-400 transition-colors" href="/about">
            Nosotros
          </Link>
        </nav>

        {/* Auth Buttons */}
        {!isLogged ? (
          <div className="flex justify-end gap-4 col-span-1">
            <Link className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow hover:bg-gray-100 transition-all" href="/login">

              Iniciar Sesión

            </Link>
            <Link className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow hover:bg-gray-600 transition-all" href="/register">

              Registrarse

            </Link>
          </div>
        ): (
          <div className="flex justify-end gap-6 col-span-1">
            <Link href={"/cart"} className='w-[30px] h-[30px]'>
              <img className='' src="/cart.png" alt="Cart" />
            </Link>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow hover:bg-gray-600 transition-all" type="submit">Sign Out</button>
            </form>
          </div>
        )}
        
      </div>
    </header>
  );
}
