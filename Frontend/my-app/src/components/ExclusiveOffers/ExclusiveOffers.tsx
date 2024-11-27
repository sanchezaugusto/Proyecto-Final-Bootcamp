"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import Loader from "../loaders/Loader";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ExclusiveOffers = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
          return text;
        }
        return text.substring(0, maxLength) + '...';
      };

    useEffect(() => {
        const fetchExclusiveOffers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products`);
                if (!response.ok) throw new Error("Error fetching products");

                const data: Product[] = await response.json();

                const affordableProducts = data.filter(product => product.price < 1000000);

                const selectedProducts = affordableProducts.slice(0, 12);

                setProducts(selectedProducts);
            } catch (error) {
                console.error("Error fetching exclusive offers:", error);
                setError("Error loading offers");
            } finally {
                setLoading(false);
            }
        };

        fetchExclusiveOffers();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <section className="container mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">
                Precios imperdibles
            </h2>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={false} 
                slidesPerView={4} 
                spaceBetween={20} 
                style={{ marginTop: "20px"}}
            >
                {products.map(product => (
                    <SwiperSlide key={product.name}>
                        <div className="h-[470px] flex flex-col justify-between p-5 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                            <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={400}
                                height={350}
                                className="w-full h-60 object-contain"
                            />
                            <div className="p-4 text-center">

                                <h3 className="text-lg font-semibold">{truncateText(product.name, 40)}</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Precio: ${product.price.toFixed(2)}
                                </p>
                                <Link
                                    href="products"
                                    className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Ver más
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ExclusiveOffers;
