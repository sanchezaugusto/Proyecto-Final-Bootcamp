'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const [timer, setTimer] = useState(3)
  const {clearCart} = useCart()
  const router = useRouter();

  if(timer < 1){
    router.push("/")
  }

  setTimeout(() =>{
    setTimer(timer - 1)
  }, 1000)

  useEffect( () =>{
    clearCart()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
      <p className="mt-4">Serás redirigido en {timer} segundos...</p>
    </div>
  );
}