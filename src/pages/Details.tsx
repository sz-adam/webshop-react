import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";
import Loading from "../components/Loading";
import { initialState, reducer } from "../reducers/detailsReducer";
import { fetchProductById } from "../services/productService";
import { FaHeart } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import Star from "../components/Star";
import { useFavorites } from "../context/FavouritesContext";
import { useCart } from "../context/CartContext";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleFavoriteClick, isFavorite } = useFavorites();
  const { addCart } = useCart();


  // Az adatok lekérésére szolgáló useEffect
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_DETAILS_REQUEST" });
      try {
        const product: Product = await fetchProductById(Number(id));
        dispatch({ type: "FETCH_DETAILS_SUCCESS", payload: product });
      } catch (error) {
        dispatch({
          type: "FETCH_DETAILS_FAILURE",
          payload: (error as Error).message,
        });
      }
    };

    getProduct();
  }, [id]);

  const { details, loading, error } = state;

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {details && (
        <section className="py-8 md:py-16 ">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full"
                  src={details.image}
                  alt={details.title}
                />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">
                  {details.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {details.price} $
                  </p>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {/**rating */}
                    <div className="flex items-center gap-1">
                      <Star
                        rating={details.rating.rate}
                        count={details.rating.count}
                      />
                    </div>
                  </div>
                </div>
                {/**button */}
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    onClick={() => handleFavoriteClick(details)}
                    className="flex w-full items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    <FaHeart
                      className={`w-5 h-5 -ms-2 me-2 ${
                        isFavorite(details.id)
                          ? "text-red-500"
                          : "text-gray-200"
                      }`}
                    />
                    {isFavorite(details.id)
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </button>

                  <button className="mt-4 w-full sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center"
                   onClick={() => addCart(details)}
                  >
                    <FaCartArrowDown className="w-5 h-5 -ms-2 me-2" />
                    Add to cart
                  </button>
                </div>

                <hr className="my-6 md:my-8 border-gray-200 " />

                <p className="mb-6 text-gray-500 ">{details.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Details;
