import React from "react";

const SearchBar = () => {
  return (
    <div className="w-[500px] flex items-center justify-between rounded-md">
      <input
        type="text"
        placeholder="Buscar productos, marcas y más..."
        className="flex-1 px-4 py-2 text-sm text-gray-700 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-white p-2 rounded-r-md hover:bg-gray-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.65 9.35a7.3 7.3 0 11-14.6 0 7.3 7.3 0 0114.6 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
