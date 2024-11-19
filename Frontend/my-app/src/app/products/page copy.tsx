"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "../../types/product";
import ProductCard from "../../components/product-card";
import Loader from "@/components/loaders/Loader";
import InputSearch from "@/components/buttons/input/InputSearch";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
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

                // Set categories dynamically
                const uniqueCategories = Array.from(new Set(formattedData.map((p: any) => p.category)));
                setCategories(uniqueCategories);
                setFilteredProducts(formattedData);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Error fetching products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    useEffect(() => {
        // Apply filters
        const filtered = products.filter((product) => {
            const inCategory = selectedCategory === "all" || product.category === selectedCategory;
            const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
            return inCategory && inPriceRange;
        });

        setFilteredProducts(filtered);
    }, [selectedCategory, priceRange, products]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            {/* <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Productos</h1> */}
            {/* Search */}
            {/* <InputSearch /> */}

            <div className="flex gap-8 container mx-auto mt-6">
                {/* Sidebar Filter */}
                <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>
                    {/* Categories */}
                    <div className="mt-6">
                        <h3 className="font-bold text-lg mb-3">Categorías</h3>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`w-full text-left px-3 py-2 rounded-md transition ${selectedCategory === "all" ? "bg-gray-900 text-white" : "hover:bg-gray-200"
                                        }`}
                                >
                                    Todas
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-md transition ${selectedCategory === category ? "bg-gray-900 text-white" : "hover:bg-gray-200"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Range */}
                    <div className="mt-6">
                        <h3 className="font-bold text-lg mb-3">Rango de precios</h3>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm">${priceRange[0]}</span>
                            <span className="text-sm">${priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                            className="w-full mb-2"
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                            className="w-full"
                        />
                    </div>
                </div>


                {/* Products */}
                <div className="w-3/4">
                    {/* Search */}
                    <InputSearch />
                    <div className="max-w-[1250px] mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
