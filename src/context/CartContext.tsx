import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";
interface CartContextType {
  cart: Product[];
  addCart:(cart: Product) =>void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart,setCart] =useState<Product[]>([])
  console.log(cart)

 // Termék hozzáadása
 const addCart = (product: Product) => {
  setCart((prevCart) => [...prevCart, product]);
};
  return <CartContext.Provider value={{cart,addCart}}>{children}</CartContext.Provider>;
};


// Ellenőrzi, hogy a contextus nem undefined-e
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};