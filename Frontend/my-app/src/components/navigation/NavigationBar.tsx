import Link from 'next/link';
import React from "react";
import { auth, signOut } from '@/auth';

/* Revisar */
type UserSession = {
    name?: string;
    email?: string;
};

type NavigationBarProps = {
    isLogged: UserSession | undefined;
};

const linkClass = 'hover:scale-105 hover:opacity-60 transition-all cursor-pointer';

const NavigationBar: React.FC<NavigationBarProps> = ({ isLogged }) => {
    return (
        <nav className="text-sm text-white py-2">
            <div className="container mx-auto flex items-center justify-between">
                {/* Menú de navegación */}
                <ul className="flex space-x-4">
                    <Link className={linkClass} href="/">
                        Categorías
                    </Link>

                    <Link className={linkClass} href="/">
                        Ofertas
                    </Link>

                    <Link className={linkClass} href="/products">
                        Productos
                    </Link>

                    <Link className={linkClass} href="/">
                        Supermercado
                    </Link>

                    <Link className={linkClass} href="/">
                        Moda
                    </Link>

                    <Link className={linkClass} href="/">
                        Vender
                    </Link>

                    <Link className={linkClass} href="/">
                        Ayuda
                    </Link>
                </ul>

                {/* Opciones del usuario */}
                {!isLogged ? (
                    <div className="flex space-x-4">
                        <Link className={linkClass} href="/login">
                            Ingresá
                        </Link>

                        <Link className={linkClass} href="/register">
                            Creá tu cuenta
                        </Link>
                    </div>
                ) : (
                    <div className="flex space-x-6 items-center">
                        <Link href="/cart" className="w-[30px] h-[30px]">
                            <img className="w-full h-full" src="/cart.png" alt="Cart" />
                        </Link>

                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow hover:bg-gray-600 transition-all"
                                type="submit"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
