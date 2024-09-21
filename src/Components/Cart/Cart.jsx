import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateProductCount,
    deleteItem,
    clearCart,
    setNumOfCartItems,
  } = useContext(CartContext);
  const [cartItems, setCartItems] = useState(null); //at first mafesh data
  const isCartEmpty = !cartItems?.data?.products.length;

  //loggedCart
  async function handleLoggedCartUser() {
    const data = await getLoggedUserCart();
    //  console.log('esta8let'  , data.data);            // call dat hatege ! ? 3yza change w rerender tany 34an el change yesama3 fel ui
    setCartItems(data.data);
  }

  //updateCount               ??????????
  async function handleUpdateCountOfProduct(pID, count) {
    const response = await updateProductCount(pID, count);
    if (response.data?.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setCartItems(response.data);
      toast.success("product updated successfully", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      toast.error("product failed to update", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  //deleteItem
  async function handleDeleteItem(pID) {
    const response = await deleteItem(pID);
    if (response.data?.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setCartItems(response.data);
      toast.success("product successfully deleted", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      toast.error("Error deleting product", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  //clearCart
  async function handleClearCart() {
    const response = await clearCart();
    if (response.data?.message == "success") {
      setNumOfCartItems(0);
      setCartItems({
        numOfCartItems: 0,
        data: {
          products: [],
          totalCartPrice: 0,
        },
      });
      toast.success("Cart cleared successfully", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      toast.error("failed to clear cart", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    handleLoggedCartUser(); //call api b3d ma el comp ytrnder
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <h2 className="text-green-600 text-2xl font-bold py-5">Shop Now</h2>
      <div className="flex flex-col justify-between min-h-screen">
        {/* Main Content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="h4 text-center mb-3 text-gray-500 dark:text-white">
              Your cart includes{" "}
              <span className="text-green-600">
                {cartItems?.numOfCartItems} different items
              </span>
            </h3>
            <button
              disabled={isCartEmpty}
              onClick={handleClearCart}
              className="bg-green-600 mb-2 text-white px-4 py-2 rounded-xl disabled:bg-green-300 disabled:text-gray-400"
            >
              clear <FaTrash className="inline-block" />
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-h-[200px]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {isCartEmpty ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-white">
                    Your cart is currently empty.
                  </td>
                </tr>
              ) : (
                cartItems?.data?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleUpdateCountOfProduct(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>{product.count}</div>
                        <button
                          onClick={() =>
                            handleUpdateCountOfProduct(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => handleDeleteItem(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="flex justify-between items-center">
          <h3 className="h4 text-center py-5 text-2xl text-gray-500 dark:text-white">
            Total Price{" "}
            <span className="text-green-600">
              {cartItems?.data?.totalCartPrice} EGP
            </span>
          </h3>
          <Link to="/checkout">
            <button
              disabled={isCartEmpty}
              className="bg-green-600 text-white px-4 py-2 rounded-xl disabled:bg-green-300 disabled:text-gray-400"
            >
              CheckOut{" "}
              <MdOutlineShoppingCartCheckout className="inline-block" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}


