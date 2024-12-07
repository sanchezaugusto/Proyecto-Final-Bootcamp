"use client";

import React, { useEffect, useState } from "react";
import { useFilter } from "@/context/FilterContext";
import { useCart } from "@/context/CartContext";
import CategoryDropdown from "../../components/dropdown";
import PriceFilter from "../../components/PriceFilter";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/product-card";
import { Product } from "../../types";
import { fetchProducts, fetchCategories } from "../services/api";

const ProductsPage = () => {
  const { filters } = useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const {addOneToCart} = useCart()

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
    <div className="bg-gray-100 min-h-screen p-8">      
      <div className="flex gap-8 container mx-auto mt-6 mt-[70px]">
          
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>
          <div className="mb-4">
            <CategoryDropdown categories={categories} />
          </div>
          <div className="mb-4">
            <PriceFilter />
          </div>
        </div>
          
        <div className="w-3/4">
          <SearchBar />
            {/* <h1 className="text-3xl font-bold mb-6">Products</h1> */}
          <div className="max-w-[1250px] mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addOneToCart}/>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;