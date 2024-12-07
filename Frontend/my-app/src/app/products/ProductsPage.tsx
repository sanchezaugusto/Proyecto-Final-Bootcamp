'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types"; //cambiar a @/types
import ProductCard from "../../components/product-card";
import Loader from "@/components/loaders";
import InputSearch from "@/components/buttons/input/InputSearch";
import { useFilter } from "@/context/FilterContext";
import FilterSidebar from "@/components/FilterSidebar";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { setCategories, selectedCategory, priceRange } = useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {addOneToCart} = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}/products`;
        const url = searchQuery ? `${baseUrl}?search=${encodeURIComponent(searchQuery)}` : baseUrl;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching products");

        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          category: item.category,
          description: item.description,
          image: item.image,
          quantity: 1,
        }));

        setProducts(formattedData);

        // Set categories dynamically
        // const uniqueCategories = Array.from(new Set(formattedData.map((p: any) => p.category)));
        // setCategories(uniqueCategories);
        // setFilteredProducts(formattedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  },[]);  //  <--- anterior mente dentro del useEffect [searchQuery, setCategories]

  // useEffect(() => {
  //   const filtered = products.filter((product) => {
  //     const inCategory = selectedCategory === "all" || product.category === selectedCategory;
  //     const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
  //     return inCategory && inPriceRange;
  //   });

  //   setFilteredProducts(filtered);
  // }, [selectedCategory, priceRange, products]);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  // }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex gap-8 container mx-auto mt-6 mt-[70px]">
        {/* Sidebar Filter */}
        <FilterSidebar />

        {/* Products */}
        <div className="w-3/4">
          <InputSearch setProducts={setProducts}/>
          <div className="max-w-[1250px] mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addOneToCart} /> */}
            {products.map((product) => (
              <ProductCard key={product._id} product={product} addToCart={addOneToCart}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//ProductPage with Filters
"use client";

import React, { useEffect, useState } from "react";
import { useFilter } from "@/contexts/FilterContext";
import CategoryDropdown from "../../components/Dropdown";
import PriceFilter from "../../components/PriceFilter";
import SearchBar from "@/components/SearchBar";
import { fetchProducts, fetchCategories } from "@/services/api";

const ProductsPage = () => {
  const { filters } = useFilter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(filters);
        setProducts(products);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    loadProducts();
  }, [filters]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="mb-4">
        <CategoryDropdown categories={categories} />
      </div>
      <div className="mb-4">
        <PriceFilter />
      </div>
      <div className="mb-4">
        <SearchBar />
      </div>
      <div className="max-w-[1250px] mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addOneToCart} /> */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product: any) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-gray-800">{product.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No products found</p>
        )}
      </div> */}
    </div>
  );
};

export default ProductsPage;