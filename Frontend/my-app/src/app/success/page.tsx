'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // redirige a la página principal 
    }, 2000);

    return () => clearTimeout(timer); // limpia el temporizador si el usuario navega antes
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
      <p className="mt-4">Serás redirigido en 3 segundos...</p>
    </div>
  );
}