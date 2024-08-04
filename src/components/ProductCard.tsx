import React from "react";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Product } from "../types/product";
import { useFavorites } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Props {
  products: Product[];
}

const ProductCard: React.FC<Props> = ({ products }) => {
  const { handleFavoriteClick, isFavorite } = useFavorites();
  const { addCart } = useCart();

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md pb-5 m-5"
        >
          <div className="relative flex h-60 overflow-hidden">
            <img
              className="absolute top-0 right-0 h-full w-full object-cover"
              src={product.image}
              alt={product.title}
            />

            <div className="absolute -right-16 top-1 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
              <button
                className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700"
                onClick={() => handleFavoriteClick(product)}
              >
                <FaHeart
                  className={`h-5 w-5 ${
                    isFavorite(product.id) ? "text-red-500" : "text-white"
                  }`}
                />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700"
                onClick={() => addCart(product)}
              >
                <FaShoppingCart className="h-5 w-5 " />
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col px-5 flex-grow">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.title}
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  {product.price} $
                </span>
              </p>
            </div>

            <Link
              to={`/details/${product.id}`}
              className="mt-auto flex items-center justify-center rounded-lg bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700 cursor cursor-pointer"
            >
              <button className="flex p-2 font-semibold">
                <FaEye className="mr-2 h-5 w-5" />
                View
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
