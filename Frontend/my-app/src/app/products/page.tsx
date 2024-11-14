// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// // import AddToCartButton from "@/app/components/cartButton/buttonAddToCart";
// // import { useCarrito } from "../carrito/carritoContext"; // Comentado para uso futuro

// export interface IProduct {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//     category: string;
//     image: string;
// }

// async function fetchingBootcamp(): Promise<IProduct[]> {
//     try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// export default function Page() {
//     const [products, setProducts] = useState<IProduct[]>([]);
//     // const { addToCarrito } = useCarrito(); // Comentado para uso futuro

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const data = await fetchingBootcamp();
//             setProducts(data);
//         };
//         fetchProducts();
//     }, []);

//     return (
//         <div className="max-w-[1250px] mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//             {products.map((product) => (
//                 <div
//                     key={product.id}
//                     className="h-[600px] bg-white py-8 px-4 border border-gray-300 rounded-2xl flex flex-col items-center justify-between text-slate-900 shadow-xl gap-4"
//                 >
//                     <Link href={`/productos/${product.id}`} passHref>
//                         <div className="flex flex-col justify-center items-center gap-4">
//                             <figure className="w-full h-[230px] overflow-hidden cursor-pointer">
//                                 <img
//                                     src={product.image}
//                                     alt={`imagen del producto ${product.title}`}
//                                     className="w-full h-full object-contain transition-all hover:scale-110"
//                                 />
//                             </figure>

//                             <h2 className="mt-2h-[40px] w-[300px] truncate line-clamp-3 font-bold text-lg md:text-xl text-center">
//                                 {product.title}
//                             </h2>

//                             <p className="max-w-[280px] h-[100px] text-gray-500 text-sm md:text-base text-center line-clamp-3">
//                                 {product.description}
//                             </p>

//                             <p className="font-bold text-center text-xl">Precio: ${product.price}</p>
//                         </div>
//                     </Link>
// {/* 
//                     <AddToCartButton /> */}
//                 </div>
//             ))}
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '../../types/product';
import ProductCard from '../../components/product-card';

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const baseUrl = `https://fakestoreapi.com/products`;
                const url = searchQuery ? `${baseUrl}?search=${encodeURIComponent(searchQuery)}` : baseUrl;
                
                const response = await fetch(url);
                console.log("el url es", url);

                if (!response.ok) throw new Error("Error fetching products");

                const data = await response.json();
                const formattedData = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    category: item.category,
                    description: item.description,
                    image: item.image,
                    quantity: 1,
                }));

                setProducts(formattedData);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error fetching products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]); 

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Productos</h1>
            <div className="max-w-[1250px] mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
