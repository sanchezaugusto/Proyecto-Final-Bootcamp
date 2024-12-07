"use client";

import React from "react";
import { useFilter } from "../../context/FilterContext";

interface Category {
  _id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

const CategoryDropdown: React.FC<Props> = ({ categories }) => {
  const { setCategory } = useFilter();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-3">Categorías</h3>
      <select onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;