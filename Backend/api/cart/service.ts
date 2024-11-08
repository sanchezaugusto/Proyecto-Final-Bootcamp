import { ICart } from "../../types";
import { cartDao } from "./dao";

const { addCart, getCarts } = cartDao;

class CartService {
  async getCarts() {
    try {
      const carts = await getCarts();
      return carts;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async addCart(cart: ICart) {
    try {
      const newCart = await addCart(cart);
      return newCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateCart(id: string, cart: ICart) {
    try {
      const updatedCart = await cartDao.updateCart(id, cart);
      return updatedCart;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const cartService = new CartService();
