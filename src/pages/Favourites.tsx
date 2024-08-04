import React from "react";
import { useFavorites } from "../context/FavouritesContext";
import ProductCard from "../components/ProductCard";
import Message from "../components/Message";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-wrap justify-center">
      {favorites.length === 0 ? (
        <Message text=" No favorite products found." />
      ) : (
        <ProductCard products={favorites} />
      )}
    </div>
  );
};

export default Favorites;
