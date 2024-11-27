'use client'

import { Product } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// FIJARSE SI SIRVEN ESTOS TYPES O VER DE LA CARPETA TYPES

// export interface CartItem {
//     id: number;
//     title: string;
//     price: number;
//     quantity: number;
//     image: string
// }

// interface CartContextType {
//     cart: CartItem[];
//     totalItems: number;
//     addToCart: (product: CartItem) => void;
//     substractOneFromCart: (product: CartItem) => void;
//     removeFromCart: (id: number) => void;
//     clearCart: () => void;
// }

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    let storedCart: Product[] = []
    if(localStorage.getItem("cart")){
        storedCart = JSON.parse(localStorage.getItem("cart"))
    }
    const [cart, setCart] = useState<Product[]>(storedCart);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        setTotalItems(cart.reduce((sum, item) => sum + item.quantity, 0));
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevCart, product];
            }
        });
    };

    const addOneToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, product];
            }
        });
    };

    const substractOneFromCart = (product: Product) => {
        setCart((prevCart) => {
            return prevCart
                .map(item =>
                    item._id === product._id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);
            })
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, totalItems, addToCart, addOneToCart, removeFromCart, substractOneFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de CartProvider");
    }
    return context;
}