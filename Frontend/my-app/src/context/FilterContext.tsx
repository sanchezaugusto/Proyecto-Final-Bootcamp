"use client";

import React, { createContext, useContext, useState } from "react";

interface FilterState {
  priceRange?: [number, number];
  category_id?: string;
  keyword?: string;
}

interface FilterContextProps {
  filters: FilterState;
  setPriceRange: (range: [number, number]) => void;
  setCategory: (category_id: string) => void;
  setKeyword: (keyword: string) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({});

  const setPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const setCategory = (category_id: string) => {
    setFilters((prev) => ({ ...prev, category_id }));
  };

  const setKeyword = (keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword }));
  };

  return (
    <FilterContext.Provider value={{ filters, setPriceRange, setCategory, setKeyword }}>
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
