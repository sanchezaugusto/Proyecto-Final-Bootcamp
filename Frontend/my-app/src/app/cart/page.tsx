"use client"
import CartProduct from "@/components/CartProduct"
import { useCart } from "@/context/CartContext"

export default function Page(){
    const {cart, addOneToCart, substractOneFromCart, removeFromCart} = useCart()
    let total = 0
    cart.forEach(product => total += (product.quantity * product.price))

    const handlePayment = async () => {
        const items = cart.map(item => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.price, // mapeo de price a unit_price
        }));
    
        try {
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
                                key={product.id} 
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
                                <div key={product.id} className="flex justify-between">
                                    <p className="w-[280px] h-[24px] overflow-clip">{product.title}</p>
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
                        <button onClick={handlePayment} className="w-full p-2 font-semibold text-white bg-gray-900 rounded-md">Completar compra</button>
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