import { useContext, useEffect, useState } from "react";
import { FaPlus, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductItem({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [color, setColor] = useState(false);
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  const { AddProductToWishlist, getLoggedUserWishlist, setCount } =
    useContext(WishlistContext);
  //call function emta ??????????? onClick => shatra ya fofo bs estny enty me7taga teshofy el daat el rag3a 34an ht3rdy mnha shwyt infooooooo tb a3ml eh ??? function ba2a dorha tehndle el 7etta de
  async function handleAddProductToCart(pID) {
    setIsLoading(true);
    const response = await addProductToCart(pID);
    if (response.data?.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setIsLoading(false);
      toast.success("Product added successfully to your cart", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      setIsLoading(false);
      toast.error("Product failed to add to your cart", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  //call function ?? lma click 3la el heartt
  //handle el function el kobry hena
  //add
  //kobry
  async function handleAddtoWashlist(e, pID) {
    const response = await AddProductToWishlist(pID);
    if (response.data?.status == "success") {
      const res = await getLoggedUserWishlist();
      setCount(res.data.count);
      e.target.classList.replace("fa-regular", "fa-solid");
      toast.success(response.data.message, {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      toast.error("error", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  // Function to check if the product is in the wishlist
  async function checkIfInWishlist() {
    const response = await getLoggedUserWishlist();
    if (response.data?.status === "success") {
      const wishlistProducts = response.data.data.map((item) => item._id);
      if (wishlistProducts.includes(product._id)) {
        setIsInWishlist(true);
      }
    }
  }

  // useEffect to check the wishlist status when the component mounts
  useEffect(() => {
    checkIfInWishlist();
  }, []);

  return (
    <>
      <div className="relative overflow-hidden group">
        <Link to={`/productDetails/${product._id}/${product.category.name}`}>
          <img
            src={product.imageCover}
            className="w-full"
            alt={product.category.name}
          />
          <h2 className="text-green-600 mt-3 font-medium h4">
            {product.category.name}
          </h2>
          <p className="dark:text-white font-semibold">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </p>
          <div className="flex justify-between items-center mt-3 mb-1">
            <h5>
              <span
                className={`me-2  ${
                  product.priceAfterDiscount
                    ? "text-red-600 line-through"
                    : "dark:text-white"
                }`}
              >
                {product.price}
              </span>
              <span className="dark:text-white">
                {product.priceAfterDiscount}
              </span>
            </h5>
            <div className="flex justify-center items-center">
              <FaStar className="text-yellow-400" />
              <h5 className="dark:text-white ms-2 text-gray-600">
                {product.ratingsAverage}
              </h5>
            </div>
          </div>
        </Link>
        <span className="">
          <i
            onClick={(e) => handleAddtoWashlist(e, product._id)}
            className={`${
              isInWishlist ? "fa-solid" : "fa-regular"
            } fa-heart text-red-600 text-xl cursor-pointer`}
          ></i>
        </span>
        <button
          onClick={() => handleAddProductToCart(product._id)}
          className="bg-green-600 px-3 py-4 rounded-2xl text-white  absolute top-2 end-2 translate-x-[150%] group-hover:translate-x-0 transition duration-300"
        >
          {isLoading ? (
            <FaSpinner className="fa-spin inline-block text-xl dark:text-white" />
          ) : (
            <FaPlus />
          )}
        </button>
      </div>
    </>
  );
}
