import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import HeroSection from '@/components/HeroSection'
import ExclusiveOffers from '@/components/ExclusiveOffers'
import BannersSlide from '@/components/BannersSlide/BannersSlide'
import FeaturesSection from '@/components/FeaturesSection'
import PaymentMethods from '@/components/PaymentMethods'

export default async  function HomePage() {
    const session = await auth()

    if(session?.user.role == "admin"){
        redirect("/dashboard/products")
    }
    return (
        <main>
        <div className="bg-gray-100 text-gray-800">
            <HeroSection />

            <ExclusiveOffers />


            <div className="container px-6 mx-auto">
                {/* <BannersSlide /> */}
            </div>


            <FeaturesSection />


            <PaymentMethods />

        </div>
        </main>
    )
}
