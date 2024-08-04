import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { LuMinusCircle } from "react-icons/lu";
import Message from "../components/Message";
import TotalAmount from "../components/TotalAmount";

const Cart: React.FC = () => {
  const { cart, removeCart, minusQuantity, plusQuantity } = useCart();

  // Összesen termék összege
  const totalAmount = cart
    .reduce((total, item) => total + (item.quantity ?? 1) * item.price, 0)
    .toFixed(2);

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <p className="text-center font-semibold">
          Promotion code : "DISCOUNT10"
        </p>
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>
        {cart.length === 0 ? (
          <Message text=" The cart is empty." />
        ) : (
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
                            {(product.price * (product.quantity || 1)).toFixed(
                              2,
                            )}
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
                <TotalAmount totalAmount={totalAmount} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
