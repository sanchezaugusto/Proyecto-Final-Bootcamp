interface FilterState {
    priceRange?: [number, number];
    category_id?: string;
    keyword?: string;
  }
  
  export const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data.map((category: any) => ({
      _id: category._id,
      name: category.name,
      subCategories: category.subCategories.map((sub: any) => ({
        _id: sub._id,
        name: sub.name,
      })),
    }));
  };
  
  export const fetchProducts = async (filters: FilterState) => {
    const { priceRange, category_id, keyword } = filters;
  
    const params = new URLSearchParams();
  
    if (priceRange) {
      params.append("priceRange", priceRange.join(","));
    }
  
    if (category_id) {
      params.append("category_id", category_id);
    }
  
    if (keyword) {
      params.append("keyword", keyword);
    }
  
    const queryString = params.toString();
    const url = `http://localhost:5000/api/products${queryString ? `?${queryString}` : ""}`;
    console.log("ESTE ES EL URL ", url);
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  
    return response.json();
  };