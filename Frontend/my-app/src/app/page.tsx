import Home from '@/components/homePage/Home'
import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async  function HomePage() {
    const session = await auth()

    if(session?.user.role == "admin"){
        redirect("/dashboard/products")
    }
    return (
        <main>
            <Home />
        </main>
    )
}
