import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './BannersSlide.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const banners = [
    { id: 1, image: '/banners/B1.png', alt: 'Banner 1' },
    { id: 2, image: '/banners/B2.png', alt: 'Banner 2' },
    { id: 3, image: '/banners/B4.png', alt: 'Banner 3' },
];

const BannersSlide = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="mySwiper"
            style={{ marginTop: '20px' }}
        >
            {banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                    <img
                        src={banner.image}
                        alt={banner.alt}
                        style={{ width: '100%', height:'100%', borderRadius: '10px' }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default BannersSlide
