"use client";

import React from "react";
import { useFilter } from "@/contexts/FilterContext";

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
    <div>
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