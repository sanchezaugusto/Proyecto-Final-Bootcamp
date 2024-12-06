"use client";

import React, { useState } from "react";
import { useFilter } from "@/context/FilterContext";

const PriceFilter: React.FC = () => {
  const { setPriceRange } = useFilter();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApplyFilter = () => {
    if (minPrice && maxPrice) {
      setPriceRange([parseFloat(minPrice), parseFloat(maxPrice)]);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={handleApplyFilter}>Apply</button>
    </div>
  );
};

export default PriceFilter;
