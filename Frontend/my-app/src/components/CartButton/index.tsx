"use client"
import Link from 'next/link'
import React from 'react'
import { useCart } from '@/context/CartContext'

export default function CartButton() {
    const {totalItems} = useCart()
    return (
        <Link href={"/cart"} className='relative w-[30px] h-[30px]'>
              <img className='' src="/cart.png" alt="Cart" />
              {totalItems > 0 ? (
                <span className='absolute right-0 left-1 bg-black rounded-full px-1 text-center text-white'>{totalItems}</span>
              ):
              null
              }
              
        </Link>
    )
}
