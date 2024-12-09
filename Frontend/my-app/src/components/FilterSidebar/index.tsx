// components/FilterSidebar.tsx
import React from 'react';
import CategoryDropdown from '../dropdown';
import PriceFilter from '../PriceFilter';
import { useFilter } from '../../context/FilterContext';

const FilterSidebar = () => {
  const { categories } = useFilter();

  return (
    <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>
      <div className="mb-4">
        <CategoryDropdown categories={categories} />
      </div>
      <div className="mb-4">
        <PriceFilter />
      </div>
    </div>
  );
};

export default FilterSidebar;
// // components/FilterSidebar.tsx
// import React from 'react';
// import CategoryDropdown from '../dropdown';
// import PriceFilter from '../PriceFilter';
// import { useFilter } from '../../context/FilterContext';

// const FilterSidebar = () => {
//   const { categories } = useFilter();

//   return (
//     <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>
//       <div className="mb-4">
//         <CategoryDropdown categories={categories} />
//       </div>
//       <div className="mb-4">
//         <PriceFilter />
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;


// // components/FilterSidebar.tsx
// import Dropdown from "../dropdown";
// import { useFilter } from "../../context/FilterContext";

// const FilterSidebar = () => {
//   const {
//     categories,
//     selectedCategory,
//     priceRange,
//     setSelectedCategory,
//     setPriceRange,
//     applyFilter // Asegúrate de que `applyFilter` esté disponible en el contexto
//   } = useFilter();

//   const handlePriceRangeChange = (index: number, value: number) => {
//     const newPriceRange = [...priceRange] as [number, number];
//     newPriceRange[index] = value;
//     setPriceRange(newPriceRange);
//     applyFilter(); // Llama a la función de filtrado después de cambiar el rango de precios
//   };

//   return (
//     <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>

//       {/* Categorías */}
//       <div className="mt-6">
//         <h3 className="font-bold text-lg mb-3">Categorías</h3>
//         <Dropdown categories={categories} />
//       </div>

//       {/* Rango de precios */}
//       <div className="mt-6">
//         <h3 className="font-bold text-lg mb-3">Rango de precios</h3>
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm">${priceRange[0]}</span>
//           <span className="text-sm">${priceRange[1]}</span>
//         </div>
//         <input
//           type="range"
//           min="1"
//           max="2000000"
//           value={priceRange[0]}
//           onChange={(e) => handlePriceRangeChange(0, +e.target.value)}
//           className="w-full mb-2"
//         />
//         <input
//           type="range"
//           min="1"
//           max="2000000"
//           value={priceRange[1]}
//           onChange={(e) => handlePriceRangeChange(1, +e.target.value)}
//           className="w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;

// // components/FilterSidebar.tsx
// import Dropdown from "../dropdown";
// import { useFilter } from "../../context/FilterContext";

// const FilterSidebar = () => {
//   const {
//     categories,
//     selectedCategory,
//     priceRange,
//     setSelectedCategory,
//     setPriceRange,
//   } = useFilter();
  
//   return (
//     <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Filtrar</h2>

//       {/* Categorías */}
//       <div className="mt-6">
//         <h3 className="font-bold text-lg mb-3">Categorías</h3>
//         <Dropdown categories={categories}/>
//       </div>

//       {/* Rango de precios */}
//       <div className="mt-6">
//         <h3 className="font-bold text-lg mb-3">Rango de precios</h3>
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm">${priceRange[0]}</span>
//           <span className="text-sm">${priceRange[1]}</span>
//         </div>
//         <input
//           type="range"
//           min="1"
//           max="2000000"
//           value={priceRange[0]}
//           onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
//           className="w-full mb-2"
//         />
//         <input
//           type="range"
//           min="1"
//           max="2000000"
//           value={priceRange[1]}
//           onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
//           className="w-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;
