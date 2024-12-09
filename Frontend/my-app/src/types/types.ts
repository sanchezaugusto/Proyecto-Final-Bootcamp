// types.ts
export interface FilterState {
    priceRange?: [number, number];
    category_id?: string;
    keyword?: string;
  }
  
  export interface FilterContextProps {
    filters: FilterState;
    categories: any[];
    selectedCategory: string | null;
    selectedCategoryName: string;
    isSubCategory: boolean;
    name: string;
    filteredProducts: any[];
    setPriceRange: (range: [number, number]) => void;
    setCategory: (category_id: string) => void;
    setKeyword: (keyword: string) => void;
    setSelectedCategory: (category: string | null) => void;
    setSelectedCategoryName: (name: string) => void;
    setIsSubCategory: (isSub: boolean) => void;
    setName: (name: string) => void;
    applyFilter: () => void;
  }
  
  export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity: number;
  }