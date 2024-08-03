import React, { useEffect, useReducer, useState } from "react";
import { Product } from "../types/product";
import Loading from "../components/Loading";
import { initialState, reducer } from "../reducers/productReducer";
import { fetchCategoryItem, fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Category";

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
      try {
        let products: Product[];
        if (selectedCategory === "all" || selectedCategory === null) {
          products = await fetchProducts();
        } else {
          products = await fetchCategoryItem(selectedCategory);
        }
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
      } catch (error) {
        dispatch({
          type: "FETCH_PRODUCTS_FAILURE",
          payload: (error as Error).message,
        });
      }
    };

    getProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "All" ? "all" : category);
  };

  return (
    <div>
      {state.error && <p>Error: {state.error}</p>}
      {state.loading && <Loading />}
      <Categories onCategoryChange={handleCategoryChange} />
      <div className="flex flex-wrap justify-center">
        <ProductCard products={state.products} />
      </div>
    </div>
  );
};

export default Home;
