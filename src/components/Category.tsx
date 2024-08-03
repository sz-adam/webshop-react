import React, { useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducers/categoryReducer";
import { Categories as CategoriesType } from "../types/category";
import { fetchCategory } from "../services/productService";

interface CategoriesProps {
  onCategoryChange: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryChange }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getCategories = async () => {
      dispatch({ type: "FETCH_CATEGORIES_REQUEST" });
      try {
        const categories: CategoriesType = await fetchCategory();
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: categories });
      } catch (error) {
        dispatch({
          type: "FETCH_CATEGORIES_FAILURE",
          payload: (error as Error).message,
        });
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      <div className="flex justify-center">
        {state.categories.map((category, index) => (
          <button
            key={index}
            className="m-2 p-2 px-4 border rounded-3xl bg-gradient-to-t from-gray-600 to-slate-800 text-slate-200"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
