export interface IUser {
    userId: string;
    role: string;
    username: string;
    email: string;
  }

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string
}
 
export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
};
