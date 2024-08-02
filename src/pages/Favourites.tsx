import React from "react";
import { useFavorites } from "../context/FavouritesContext";
import ProductCard from "../components/ProductCard";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.length === 0 ? (
       <div className="flex justify-center text-center">
         <p className="font-bold text-4xl text-red-600 mt-10">No favorite products found.</p>
       </div>
      ) : (
        <ProductCard products={favorites} />
      )}
    </div>
  );
};

export default Favorites;
