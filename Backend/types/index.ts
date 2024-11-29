export type UserRole = "admin" | "comprador" | "vendedor";

export interface IUser {
  _id: string | undefined;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  image: string | undefined;
}

export interface IProduct {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  // image?: string;
  image?: string[];
  categoryId?: string;
  subCategoryId?: string;
}

export interface ICart {
  user_id: string;
  products: { product_id: string; quantity: number }[];
  totalPrice: number;
}

export interface ICategory {
  _id: string | undefined;
  name: string;
  subCategories?: { id: string }[]; // Array de objetos con campo `id`
}

export interface ISubCategory {
  _id: string;
  name: string;
}