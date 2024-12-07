"use client";

import React, { useState } from "react";
import { useFilter } from "@/context/FilterContext";

const PriceFilter: React.FC = () => {
  const { setPriceRange } = useFilter();
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [isActive, setIsActive] = useState(false);  


  const handleApplyFilter = () => {
    if (minPrice && maxPrice) {
      setPriceRange([parseFloat(minPrice), parseFloat(maxPrice)]);
      setIsActive(true);      
    }
  };

  const handleToggleFilter = () => {
    if (isActive) {
      // Desactivar el filtro
      setPriceRange([0, 0]);
      setMinPrice("0");
      setMaxPrice("0");
    } else {
      // Activar el filtro
      handleApplyFilter();
    }
    setIsActive(!isActive);
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-3">Rango de precios</h3>
      <div className="flex items-center justify-between mb-4">      
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        disabled={isActive}
        className="w-full mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        disabled={isActive}
        className="w-full mb-2 border rounded"
      />
      <button
        onClick={handleToggleFilter}
        className={`p-2 rounded ${isActive ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
      >
        {isActive ? "OFF" : "ON"}
      </button>
    </div>
  </div>
  );
};

export default PriceFilter;
