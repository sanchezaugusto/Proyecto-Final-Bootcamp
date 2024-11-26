export interface IUser {
    userId: string;
    role: string;
    username: string;
    email: string;
  }

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string
}
export interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    addToCart: (product: CartItem) => void;
    substractOneFromCart: (product: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}
 
export interface Product  {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string[];
  quantity: number;
};
