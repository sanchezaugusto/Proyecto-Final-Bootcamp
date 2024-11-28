'use client'
//import { registerOrder } from "@/services/orderService"; // Importar el servicio para registrar órdenes
import { useCart } from "@/context/CartContext";
import CartProduct from "@/components/CartProduct"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Page(){
    const router = useRouter()
    const {data: session} = useSession()
    
    const {cart, addOneToCart, substractOneFromCart, removeFromCart} = useCart()
    let total = 0
    cart.forEach(product => total += (product.quantity * product.price))

    const handleOrders = async () => {
        const items = cart.map(item => ({
          product_id: item._id, // Asegúrate de que coincida con el modelo del backend
          quantity: item.quantity,
          sub_total: item.price * item.quantity, // Calcula el subtotal aquí
        }));
    
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
        const orderData = {
            user_id: session?.user.id, // Reemplaza esto con el ID del usuario logueado
            products: items,
            total_price: totalPrice,
        };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/confirmOrder`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderData),
            });
        
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Error al registrar la orden: ${errorText}`);
            }
        
            const data = await response.json();
            console.log("Orden registrada exitosamente:", data);
            return data;
          } catch (error) {
            console.error("Error en registerOrder:", error);
            throw error;
          }
    };

    const handlePayment = async () => {
        const items = cart.map(item => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price, // mapeo de price a unit_price
        }));

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        try {
          console.log("hola")
          const mailRequest = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/mails/sendMail/${session.user.email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
          });
  
          const mailResponse = await mailRequest.json()
          console.log(mailResponse, `${process.env.NEXT_PUBLIC_API_HOST}/mails/sendMail/${session.user.email}`)

          const response = await fetch("/api/mercadopago", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
          });
    
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url; // Redirige al URL de pago
          } else {
            console.error("No se recibió una URL de pago válida.");
          }
        } catch (error) {
          console.error("Error al generar el pago:", error);
        }
      };

      if(!session){
        return
      }

    return(
        <main className="grid grid-cols-3 w-9/12 mx-auto mt-5 gap-4 ">
            {cart.length > 0 ? (
                <>
                <section className="col-span-2 p-3 bg-gray-50 rounded shadow">
                    <h2 className="text-xl font-semibold">Carrito de compras</h2>
                    <div className="flex flex-col gap-2 mt-2">
                        {cart.map((product) =>{
                            return (
                            <CartProduct 
                                key={product._id} 
                                product={product}
                                addProduct={addOneToCart}
                                substractOneFromCart={substractOneFromCart}
                                removeFromCart={removeFromCart}
                            />
                            )
                        })}
                    </div>
                </section>

                <section className="p-3 bg-gray-50 rounded shadow">
                    <h2 className="text-xl font-semibold border-b">Resumen</h2>
                    <div className="mt-3 pb-2 border-b">
                        {cart.map(product =>{
                            return(
                                <div key={product._id} className="flex justify-between">
                                    <p className="w-[280px] h-[24px] overflow-clip">{product.name}</p>
                                    <span>${(product.quantity * product.price).toFixed(2)}</span>
                                </div>
                            )
                        })}
                        
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className="font-semibold">Total</p>
                        <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>

                    <div className="flex mt-4">
                    <button
                        onClick={async () => {
                            await handleOrders(); // Registra la orden en la BD
                            await handlePayment(); // Procesa el pago
                        }}
                        className="w-full p-2 font-semibold text-white bg-gray-900 rounded-md"
                        >                            
                            Completar compra
                        </button>
                    </div>
                </section>
            </>
            ): 
                <section className="mt-10 p-3 bg-gray-50 rounded shadow col-end-3">
                    <h2 className="text-lg text-center font-semibold">El carrito está vacío</h2>
                </section>
            }
        </main>
    )
}