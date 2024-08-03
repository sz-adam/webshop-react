import React, { useEffect, useReducer } from "react";
import { Product } from "../types/product";
import Loading from "../components/Loading";
import { initialState, reducer } from "../reducers/productReducer";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Category";

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
      <div>
        <Categories />
        <div className="flex flex-wrap justify-center">
          <ProductCard products={state.products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
