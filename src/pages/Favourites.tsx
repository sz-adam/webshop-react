import React from "react";
import { useFavorites } from "../context/FavouritesContext";
import ProductCard from "../components/ProductCard";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorite products found.</p>
      ) : (
        <ProductCard products={favorites} />
      )}
    </div>
  );
};

export default Favorites;
