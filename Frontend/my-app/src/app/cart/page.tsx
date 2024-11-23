"use client"
import CartProduct from "@/components/CartProduct"
import { useCart } from "@/context/CartContext"

export default function Page(){
    const {cart, addToCart, substractOneFromCart, removeFromCart} = useCart()
    let total = 0
    cart.forEach(product => total += (product.quantity * product.price))
    return(
        <main className="grid grid-cols-3 w-9/12 mx-auto mt-5 gap-4 ">
            <section className="col-span-2 p-3 bg-gray-50 rounded shadow">
                <h2 className="text-xl font-semibold">Carrito de compras</h2>
                <div className="flex flex-col gap-2 mt-2">
                    {cart.map((product) =>{
                        return (
                        <CartProduct 
                            key={product.id} 
                            product={product}
                            addProduct={addToCart}
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
                    <button className="w-full p-2 font-semibold text-white bg-gray-900 rounded-md">Completar compra</button>
                </div>
            </section>
        </main>
    )
}