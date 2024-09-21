import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetCode() {
  const navigate = useNavigate();

  // State for error and success messages
  const [errorvlu, setErrorvlu] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema
  const schema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d{3,6}$/, "Enter your 3 to 6-digit reset code"),
  });

  const resetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        setSuccessMsg(response.data.status);
        setTimeout(() => {
          navigate("/resetpassword");
        }, 3000);
      } catch (error) {
        setErrorvlu(error.response?.data?.message || "An error occurred");
        setTimeout(() => setErrorvlu(null), 3000);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: schema,
  });

  return (
    <div className="h-screen flex items-center justify-center dark:bg-[#111827] bg-gray-100 p-4">
      <div className="bg-white dark:bg-[#374151] shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Error and Success Messages */}
        {errorvlu && (
          <div
            className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorvlu}
          </div>
        )}
        {successMsg && (
          <div
            className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {successMsg}
          </div>
        )}

        <h2 className="text-green-600 text-2xl mb-6">Reset Code</h2>

        <form onSubmit={resetCodeFormik.handleSubmit} className="space-y-5">
          {/* Reset Code */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetCodeFormik.getFieldProps("resetCode")}
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reset Code:
            </label>
          </div>
          {resetCodeFormik.errors.resetCode &&
            resetCodeFormik.touched.resetCode && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetCodeFormik.errors.resetCode}
              </div>
            )}

          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block dark:text-white text-lg" />
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
