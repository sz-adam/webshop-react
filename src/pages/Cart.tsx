import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { LuMinusCircle } from "react-icons/lu";

const Cart: React.FC = () => {
  const { cart, removeCart, minusQuantity, plusQuantity } = useCart();
 
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ellenőrizzük, hogy a promóciós kód "DISCOUNT10"-e , Backend oldalon történik hivatalossan
    if (promoCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% kedvezmény
      setError("");
    } else {
      setError("Invalid promo code. Please try again.");
      setDiscount(0);
    }
  };

  // Összesen termék összege
  const totalAmount = cart
    .reduce((total, item) => total + (item.quantity ?? 1) * item.price, 0)
    .toFixed(2);

  //kedvezmény összege 2 tizedesjegyig
  const discountAmount = (parseFloat(totalAmount) * discount).toFixed(2);
  //eredeti összegből levonjuk a kedvezményes összeget
  const discountedAmount = (
    parseFloat(totalAmount) - parseFloat(discountAmount)
  ).toFixed(2);

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <p className="text-center font-semibold">Promotion code : "DISCOUNT10"</p>
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart.map((product) => (
              <div key={product.id} className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link
                      to={`/details/${product.id}`}
                      className="shrink-0 md:order-1"
                    >
                      <img
                        className="h-20 w-20 dark:hidden"
                        src={product.image}
                        alt={product.title}
                      />
                    </Link>

                    <label className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          disabled={product.quantity === 1}
                          onClick={() => minusQuantity(product)}
                        >
                          <LuMinusCircle className="h-5 w-5 text-gray-900 " />
                        </button>
                        <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 ">
                          {" "}
                          {product.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => plusQuantity(product)}
                        >
                          <BsPlusCircle className="h-5 w-5 text-gray-900 " />
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 ">
                          $
                          {(product.price * (product.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <Link
                        to={`/details/${product.id}`}
                        className="text-base font-medium text-gray-900 hover:underline "
                      >
                        {product.title}
                      </Link>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                          onClick={() => removeCart(product)}
                        >
                          <IoMdClose className="me-1.5 h-5 w-5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900 ">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 ">
                      {totalAmount} $
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      Discount
                    </dt>
                    <dd className="text-base font-medium text-gray-900 ">
                      {discountAmount} $
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    {discountedAmount} $
                  </dd>
                </dl>
              </div>

              <Link
                to="#"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 "> or </span>
                <Link
                  to="/"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                >
                  Continue Shopping
                  <FaArrowRightLong className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6">
              <form onSubmit={applyPromoCode} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 ">
                    {" "}
                    Do you have a voucher or gift card?{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Apply Code
                </button>
                {error && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
