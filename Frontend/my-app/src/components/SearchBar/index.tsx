"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";

const SearchBar: React.FC = () => {
  const { setKeyword } = useFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
<div className="flex items-center justify-center">
  <div className="rounded-lg w-full mb-6 shadow-md">
    <div className="flex">
      <input
        type="text"
        placeholder="Search keyword"
        onChange={handleSearchChange}
        className="p-2 text-base w-full border border-gray-300 rounded-md"
      />
    </div>
  </div>
</div>
  );
};

export default SearchBar;
