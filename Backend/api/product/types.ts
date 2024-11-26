type filterByPrice = "lower" | "higher";

export interface ISearchParams {
  category_id?: string;
  subCategory_id?: string;
  salers_id?: string;
  filterByPrice?: filterByPrice;
  priceRange?: string;
  page?: string;
  limit?: string;
  keyword?: string;
}
