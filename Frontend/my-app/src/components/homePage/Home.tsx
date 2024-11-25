"use client"

import ExclusiveOffers from "../ExclusiveOffers/ExclusiveOffers"
import PaymentMethods from "../PaymentMethods/PaymentMethods"
import HeroSection from "../HeroSection/HeroSection"
import FeaturesSection from "../FeaturesSection/FeaturesSection"

const Home = () => {
    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Hero Section */}
            <HeroSection />

            <ExclusiveOffers />
            
            {/* Features Section */}
            <FeaturesSection />

            {/* Payment Methods */}
            <PaymentMethods />

        </div>
    )
}

export default Home
