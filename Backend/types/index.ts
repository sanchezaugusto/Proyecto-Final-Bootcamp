export type UserRole = "admin" | "comprador" | "vendedor";

export interface IUser {
  _id: string | undefined;
  firts_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  role?: UserRole;
  avatar: string | undefined;
}

export interface IProduct {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface ICart {
  products: { product_id: string; quantity: number }[];
  totalPrice: number;
}
