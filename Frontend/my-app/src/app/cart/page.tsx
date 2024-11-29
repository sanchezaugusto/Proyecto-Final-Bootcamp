import React from 'react'
import Cart from '@/components/Cart'
import { auth } from '@/auth'
export default async function CartPage() {
    const session = await auth()
    return (
        <Cart user={session?.user}/>
    )
}
