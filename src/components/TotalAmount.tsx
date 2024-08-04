import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

interface TotalAmountProps {
  totalAmount: string;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ totalAmount }) => {
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

  //kedvezmény összege 2 tizedesjegyig
  const discountAmount = (parseFloat(totalAmount) * discount).toFixed(2);
  //eredeti összegből levonjuk a kedvezményes összeget
  const discountedAmount = (
    parseFloat(totalAmount) - parseFloat(discountAmount)
  ).toFixed(2);

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-gray-900 ">Order summary</p>
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
              <dt className="text-base font-normal text-gray-500 ">Discount</dt>
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
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TotalAmount;
