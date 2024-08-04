import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types/product";
interface CartContextType {
  cart: Product[];
  addCart: (cart: Product) => void;
  removeCart: (cart: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  //termék hozzáadása
  const addCart = (product: Product) => {
    // Keresd meg a terméket a kosárban
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Ha a termék már létezik a kosárban, frissítsd a mennyiséget
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          // Ha az item létezik, frissítsd a quantity-t, vagy állítsd be 1-re, ha nem létezik
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      // Ha a termék nem létezik, add hozzá a kosárhoz quantity = 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  //termék törlése
  const removeCart = (product: Product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Ellenőrzi, hogy a contextus nem undefined-e
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
