import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Register from "./Components/Register/Register";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvidor from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import { Offline } from "react-detect-offline";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";

//create a client
const queryClient = new QueryClient({
  //default config on all components that have useQuery
  defaultOptions: {
    queries: {
      //setting
      staleTime: 10 * 1000, // data htkon fresh l7ad 10s b3den tekon stale 2adema => lw 7asal 1- mount mnl compo 2- disable intenet 3- focus on window 5rgt mnl tap aw el mawqa3 kolo yegga3 lel fresh ye refetch data tany 34an lmma arga3 lel compoent ye3rd lw feh ta8yer fel data mnl backend .
    },
  },
});

function App() {
  const route = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget", element: <ForgetPassword /> },
        { path: "resetcode", element: <ResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id/:name",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              {" "}
              <Wishlist />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              {" "}
              <CheckOut />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrders />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <CartContextProvidor>
          <WishlistContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={route} />
            </QueryClientProvider>
          </WishlistContextProvider>
        </CartContextProvidor>
      </UserContextProvider>
      <Toaster />
      <Offline>
        <div className="bg-gray-500 text-white text-xl fixed bottom-5 left-6 p-5 rounded-2xl">
          You are offline right now. Check your connection.
        </div>
      </Offline>
    </>
  );
}

export default App;
