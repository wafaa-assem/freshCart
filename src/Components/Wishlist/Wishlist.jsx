import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaSpinner, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import img from "./../../assets/images/wishlist.jpg";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const { getLoggedUserWishlist, deleteProductFromWishlist, setCount } =
    useContext(WishlistContext);
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productId, setProductId] = useState(null);
  const [proId, setProId] = useState(null);

  // call here
  //get wishlist
  //kobry hena
  async function getWishlist() {
    const response = await getLoggedUserWishlist();
    if (response.data?.status == "success") {
      setWishlistItems(response.data.data);
      return response.data.count;
    }
  }

  //add
  async function handleAddProductToCart(pID) {
    setProductId(pID);
    setBtnLoading(true);
    const response = await addProductToCart(pID);
    if (response.data.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setBtnLoading(false);
      toast.success("Product added successfully to your cart", {
        position: "bottom-right",
        duration: 1000,
      });
    } else {
      setBtnLoading(false);
      toast.error("Product failed to add to your cart", {
        position: "bottom-right",
        duration: 1000,
      });
    }
  }

  //delete
  async function handleDeleteFromWishlist(pID) {
    setProId(pID);
    setRemoveLoading(true);
    const response = await deleteProductFromWishlist(pID);
    if (response.data?.status == "success") {
      setRemoveLoading(false);
      const res = await getWishlist();
      setCount(res);
      toast.success(response.data.message, {
        position: "bottom-right",
        duration: 1000,
      });
    } else {
      setRemoveLoading(false);
      toast.error("Product removed failed to your wishlist", {
        position: "bottom-right",
        duration: 1000,
      });
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Wishlist</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <h2 className="text-green-600 text-2xl font-bold py-5">My Wishlist</h2>
      <div>
        {wishlistItems.length != 0 ? (
          <div className="grid gap-8 grid-cols-8 items-center">
            {wishlistItems.map((item) => (
              <React.Fragment key={item._id}>
                <div className="col-span-3">
                  <img
                    src={item.imageCover}
                    className="w-full"
                    alt={item.title}
                  />
                </div>
                <div className="col-span-5">
                  <h2 className="text-green-600 mt-3 font-medium h4">
                    {item.category.name}
                  </h2>
                  <p className="dark:text-white font-semibold">{item.title}</p>
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h5>
                      <span
                        className={`me-2  ${
                          item.priceAfterDiscount
                            ? "text-red-600 line-through"
                            : "dark:text-white"
                        }`}
                      >
                        {item.price}
                      </span>
                      <span className="dark:text-white">
                        {item.priceAfterDiscount}
                      </span>
                    </h5>
                    <div className="flex justify-center items-center">
                      <FaStar className="text-yellow-400" />
                      <h5 className="dark:text-white ms-2 text-gray-600">
                        {item.ratingsAverage}
                      </h5>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddProductToCart(item._id)}
                    className="bg-green-600 text-white text-center w-full rounded-lg mt-3 py-1"
                  >
                    {btnLoading && productId == item._id ? (
                      <FaSpinner className="fa-spin inline-block text-xl" />
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteFromWishlist(item._id)}
                    className="bg-red-600 text-white text-center w-full rounded-lg mt-3 py-1"
                  >
                    {removeLoading && proId == item._id ? (
                      <FaSpinner className="fa-spin inline-block text-xl" />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </React.Fragment>
            ))}{" "}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              src={img}
              alt="No products"
              className="w-80 h-80 mb-4 rounded-lg shadow-md"
            />
            <p className="text-center text-gray-700 text-2xl font-semibold dark:text-gray-300">
              No Products In Your WishList
            </p>
          </div>
        )}
      </div>
    </>
  );
}
