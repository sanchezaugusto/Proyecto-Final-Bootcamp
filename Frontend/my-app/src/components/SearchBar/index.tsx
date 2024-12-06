"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";

const SearchBar: React.FC = () => {
  const { setKeyword } = useFilter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search keyword"
      onChange={handleSearchChange}
      style={{
        padding: "10px",
        fontSize: "16px",
        width: "100%",
        maxWidth: "300px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
  );
};

export default SearchBar;
