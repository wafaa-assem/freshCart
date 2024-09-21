// import axios from "axios";
// import { useFormik } from "formik";
// import { useState } from "react";
// import { FaSpinner } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

// export default function ResetPassword() {

//     const navigate = useNavigate();
//     //state check error
//     const [errorvlu, setErrorvlu] = useState(null);
//     //state check success
//     const [successMsg, setSuccessMsg] = useState(null);
//     //state loading
//     const [isLoading, setIsLoading] = useState(false);
//     // 1- draw schema     2- link it with formik => validationSchema: schema
//     const schema = Yup.object().shape({
//       email: Yup.string().required("email is required").email(),
//       newPassword: Yup.string()
//         .required("password is a required")
//         .matches(
//           /^[A-Z][a-z0-9]{5,}$/,
//           "must start with uppercase then at least 5 characters"
//         ),
//     });

//     const resetPasswordFormik = useFormik({
//       initialValues: {
//         email: "",
//         newPassword: "",
//       },
//       //onSubmit => submit => fire the func when resetPasswordFormik.errors {} empty
//       onSubmit: async (values) => {
//         setIsLoading(true);
//         await axios
//           .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
//           .then((response) => {
//             console.log(response);
//             // setSuccessMsg(response.data.message);
//             setTimeout(() => {
//               navigate('/login');
//             }, 2000);
//           })
//           .catch((error) => {
//             console.log(error.response);
//             setErrorvlu(error.response.data.message);
//             setTimeout(() => {
//               setErrorvlu(null);
//             }, 2000);
//           })
//           .finally(() => {
//             setIsLoading(false);
//           });
//       },
//       validationSchema: schema,
//     });

//     return (
//       <div>
//         {/* {errorvlu ? (
//           <div
//             className="p-3 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//             role="alert"
//           >
//             {errorvlu}
//           </div>
//         ) : null} */}
//         {successMsg ? (
//           <div
//             className="p-3 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//             role="alert"
//           >
//             {successMsg}
//           </div>
//         ) : null}
//         <h2 className="text-green-600">Reset Password</h2>
//         <form onSubmit={resetPasswordFormik.handleSubmit} className="mx-auto my-5">
//           {/* email */}
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               // value={resetPasswordFormik.values.email}
//               // onChange={resetPasswordFormik.handleChange}
//               // onBlur={resetPasswordFormik.handleBlur}
//               {...resetPasswordFormik.getFieldProps("email")}
//               type="email"
//               name="email"
//               id="email"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//               placeholder=" "
//             />
//             <label
//               htmlFor="email"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               userEmail :
//             </label>
//           </div>
//           {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email ? (
//             <div
//               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//               role="alert"
//             >
//               {resetPasswordFormik.errors.email}
//             </div>
//           ) : null}
//           {/* password */}
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               // value={resetPasswordFormik.values.password}
//               // onChange={resetPasswordFormik.handleChange}
//               // onBlur={resetPasswordFormik.handleBlur}
//               {...resetPasswordFormik.getFieldProps("newPassword")}
//               type="password"
//               name="newPassword"
//               id="newPassword"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//               placeholder=" "
//             />
//             <label
//               htmlFor="newPassword"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               userNewPassword :
//             </label>
//           </div>
//           {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword ? (
//             <div
//               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//               role="alert"
//             >
//               {resetPasswordFormik.errors.newPassword}
//             </div>
//           ) : null}
//           <button
//             disabled={isLoading}
//             type="submit"
//             className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//           >
//             {isLoading ? <FaSpinner className="animate-spin inline-block dark:text-white text-xl" /> : "Submit"}
//           </button>
//         </form>
//       </div>
//     );
// }

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const navigate = useNavigate();

  // State for error and success messages
  const [errorvlu, setErrorvlu] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,}$/,
        "Password must start with an uppercase letter and be at least 6 characters long"
      ),
  });

  const resetPasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );
        setSuccessMsg("Password reset successful. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setErrorvlu(error.response?.data?.message || "An error occurred");
        setTimeout(() => setErrorvlu(null), 2000);
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

        <h2 className="text-green-600 text-2xl mb-6">Reset Password</h2>

        <form onSubmit={resetPasswordFormik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetPasswordFormik.getFieldProps("email")}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email:
            </label>
          </div>
          {resetPasswordFormik.errors.email &&
            resetPasswordFormik.touched.email && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetPasswordFormik.errors.email}
              </div>
            )}

          {/* New Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetPasswordFormik.getFieldProps("newPassword")}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password:
            </label>
          </div>
          {resetPasswordFormik.errors.newPassword &&
            resetPasswordFormik.touched.newPassword && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetPasswordFormik.errors.newPassword}
              </div>
            )}

          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-green-700 disabled:bg-green-100 disabled:text-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin inline-block dark:text-white text-xl" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
