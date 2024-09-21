import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaSpinner } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function CheckOut() {
  const { checkOut, cartID } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const checkoutFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await checkOut(cartID, values);
      console.log("res", res);
      setIsLoading(false);
      if (res.data.status === "success") {
        toast.success(res.data.status);
        window.location.href = res.data.session.url;
      }
    },
  });

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 dark:bg-[#111827] bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheckOut</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="bg-white dark:bg-[#374151] shadow-sm rounded-lg p-8 max-w-md w-full">
        <h2 className="text-green-600 text-2xl mb-6">CheckOut</h2>
        <form onSubmit={checkoutFormik.handleSubmit} className="space-y-5">
          {/* Details */}
          <div className="relative z-0 w-full group">
            <input
              {...checkoutFormik.getFieldProps("details")}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Details:
            </label>
          </div>

          {/* Phone */}
          <div className="relative z-0 w-full group">
            <input
              {...checkoutFormik.getFieldProps("phone")}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Phone:
            </label>
          </div>

          {/* City */}
          <div className="relative z-0 w-full group">
            <input
              {...checkoutFormik.getFieldProps("city")}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User City:
            </label>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block dark:text-white text-xl" />
            ) : (
              "Pay Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
