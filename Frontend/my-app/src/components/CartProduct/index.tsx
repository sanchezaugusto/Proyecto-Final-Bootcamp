"use client"
import React from 'react'
import { Product } from '@/types'

interface Props{
    product: Product
    addProduct: (product: Product) => void,
    substractOneFromCart: (product: Product) => void,
    removeFromCart: (id: string) => void

}
export default function CartProduct({product, addProduct, substractOneFromCart, removeFromCart}: Props) {
    return (
        <div className="flex justify-between items-center p-4 odd:bg-neutral-100 rounded shadow">
            <div className="w-[150px] h-[150px] p-2 relative">
                <img className='w-full h-full' src={product.image[0]} alt="" />
            </div>
            <p className='w-[300px] font-semibold'>{product.name}</p>
            <div className='flex items-center gap-2'>
                <button disabled={product.quantity == 1} onClick={() => substractOneFromCart(product)} className='px-2 py-1 font-bold text-lg bg-gray-900 text-white rounded-lg disabled:bg-gray-700'>-</button>
                <span className='p-2 bg-gray-200 rounded-md'>{product.quantity}</span>
                <button onClick={() => addProduct(product)} className='px-2 py-1 font-bold text-lg bg-gray-900 text-white rounded-lg'>+</button>
            </div>

            <span className='w-[66px] text-lg font-semibold'>${(product.quantity * product.price).toFixed(2)}</span>

            <button onClick={() => removeFromCart(product._id)} className='px-2 py-1 font-bold text-lg bg-gray-900 text-white rounded-lg'>x</button>
        </div>
    )
}
