"use client"

import { getCategories } from "@/services/categoryService";
// context/FilterContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";


interface FilterContextProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  setSelectedCategory: (category: string) => void;
  setCategories: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() =>{
    const fechtCategories = async () =>{
      setCategories(await getCategories())
    }
    fechtCategories()
  }, [])
  return (
    <FilterContext.Provider
      value={{
        categories,
        selectedCategory,
        priceRange,
        setSelectedCategory,
        setCategories,
        setPriceRange,
        selectedCategoryName,
        setSelectedCategoryName
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

