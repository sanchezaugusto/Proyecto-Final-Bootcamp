"use client"

import ExclusiveOffers from "../ExclusiveOffers"
import PaymentMethods from "../PaymentMethods"
import HeroSection from "../HeroSection"
import FeaturesSection from "../FeaturesSection"
import BannersSlide from "../BannersSlide/BannersSlide"

const Home = () => {
    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Hero Section */}
            <HeroSection />

            <ExclusiveOffers />

            {/* Banners Section */}
            <div className="container px-6 mx-auto">
                <BannersSlide />
            </div>

            {/* Features Section */}
            <FeaturesSection />

            {/* Payment Methods */}
            <PaymentMethods />

        </div>
    )
}

export default Home
