"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FilterState, FilterContextProps } from "../types/types"; // Adjust the import path as necessary
import { getCategories } from "@/services/categoryService";

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 2000000]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategories());
    };
    fetchCategories();
  }, []);

  const applyFilter = async () => {
    try {
      const query = new URLSearchParams();
      if (selectedCategory) query.append("category", selectedCategory);
      if (name) query.append("name", name);
      query.append("minPrice", priceRange[0].toString());
      query.append("maxPrice", priceRange[1].toString());

      const response = await fetch(`/api/products?${query.toString()}`);
      if (!response.ok) throw new Error("Error fetching products");
      const filteredProducts = await response.json();
      setFilteredProducts(filteredProducts);
      console.log(`Productos filtrados:`, filteredProducts);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        categories,
        selectedCategory,
        selectedCategoryName,
        isSubCategory,
        name,
        filteredProducts,
        setPriceRange: (range: [number, number]) => setFilters((prev) => ({ ...prev, priceRange: range })),
        setCategory: (category_id: string) => setFilters((prev) => ({ ...prev, category_id })),
        setKeyword: (keyword: string) => setFilters((prev) => ({ ...prev, keyword })),
        setSelectedCategory,
        setSelectedCategoryName,
        setIsSubCategory,
        setName,
        applyFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

//Augusto
// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { FilterState, FilterContextProps } from "../types/types"; // Adjust the import path as necessary

// const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [filters, setFilters] = useState<FilterState>({});

//   const setPriceRange = (range: [number, number]) => {
//     setFilters((prev) => ({ ...prev, priceRange: range }));
//   };

//   const setCategory = (category_id: string) => {
//     setFilters((prev) => ({ ...prev, category_id }));
//   };

//   const setKeyword = (keyword: string) => {
//     setFilters((prev) => ({ ...prev, keyword }));
//   };

//   return (
//     <FilterContext.Provider value={{ filters, setPriceRange, setCategory, setKeyword }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   return context;
// };

// "use client";

// import React, { createContext, useContext, useState } from "react";

// interface FilterState {
//   priceRange?: [number, number];
//   category_id?: string;
//   keyword?: string;
// }

// interface FilterContextProps {
//   filters: FilterState;
//   setPriceRange: (range: [number, number]) => void;
//   setCategory: (category_id: string) => void;
//   setKeyword: (keyword: string) => void;
// }

// const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [filters, setFilters] = useState<FilterState>({});

//   const setPriceRange = (range: [number, number]) => {
//     setFilters((prev) => ({ ...prev, priceRange: range }));
//   };

//   const setCategory = (category_id: string) => {
//     setFilters((prev) => ({ ...prev, category_id }));
//   };

//   const setKeyword = (keyword: string) => {
//     setFilters((prev) => ({ ...prev, keyword }));
//   };

//   return (
//     <FilterContext.Provider value={{ filters, setPriceRange, setCategory, setKeyword }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   return context;
// };
