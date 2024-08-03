import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "../types/product";

interface FavoritesContextType {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  handleFavoriteClick: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //Kedvencek hozzáadása és eltávolítása
  const handleFavoriteClick = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  // A kedvenc termékek listája
  const [favorites, setFavorites] = useState<Product[]>([]);

  //termék hozzáadása
  const addFavorite = (product: Product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  //termék eltávolítása
  const removeFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId),
    );
  };

  //azonosító alapján ellenörzi hogy a kedvencekben van-e , ha benne van true érték ha nincs false (some)
  const isFavorite = (productId: number) => {
    return favorites.some((product) => product.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        handleFavoriteClick,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Ellenőrzi, hogy a contextus nem undefined-e
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
