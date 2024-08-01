import React, { useEffect, useReducer } from "react";
import { Product } from "../types/product";

import Loading from "../components/Loading";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { initialState, reducer } from "../reducers/productReducer";
import { fetchProducts } from "../services/productService";

const Home: React.FC = () => {
  // Használjuk a useReducer-t az állapot kezelésére
  const [state, dispatch] = useReducer(reducer, initialState);

  // Az adatok lekérésére szolgáló useEffect
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
      try {
        const products: Product[] = await fetchProducts();
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
      } catch (error) {
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: (error as Error).message,
        });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      {state.error && <p>Error: {state.error}</p>}
      {state.loading && (
        <div>
          <Loading />
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {state.products.map((product) => (
          <div
            key={product.id}
            className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md pb-5 m-5"
          >
            <div className="relative flex h-60 overflow-hidden" >
              <img
                className="absolute top-0 right-0 h-full w-full object-cover"
                src={product.image}
                alt={product.title}
              />

              <div className="absolute -right-16 top-1 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <FaHeart className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                  <FaShoppingCart className="h-5 w-5" />
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
              <div className="mt-auto flex items-center justify-center rounded-lg bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700 cursor cursor-pointer">
                <button className="flex p-2 font-semibold">
                  <FaEye className="mr-2 h-5 w-5" />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
