import axios from "axios";
import { FaSpinner, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../CustomHooks/useProducts";
import ProductItem from "../ProductItem/ProductItem";
import Slider from "react-slick";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loading from "./../Loading/Loading";

export default function ProductDetails() {
  const [btnLoading, setBtnLoading] = useState(false);
  const { addProductToCart, setNumOfCartItems } = useContext(CartContext);
  //call function emta ??????????? onClick => shatra ya fofo bs estny enty me7taga teshofy el data el rag3a 34an ht3rdy mnha shwyt infooooooo tb a3ml eh ??? function ba2a dorha tehndle el 7etta de
  async function handleAddProductToCart(pID) {
    setBtnLoading(true);
    const response = await addProductToCart(pID);
    if (response.data.status == "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setBtnLoading(false);
      toast.success("Product added successfully to your cart", {
        position: "bottom-right",
        duration: 3000,
      });
    } else {
      setBtnLoading(false);
      toast.error("Product failed to add to your cart", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
  };
  const { id, name } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  });

  const { data: products } = useProducts();
  const relatedProducts = products?.filter(
    (product) => product.category.name === name
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid gap-8 grid-cols-12 items-center">
        <div className="col-span-4">
          {data.images.length > 1 ? (
            <Slider {...settings}>
              {data.images.map((src) => (
                <img
                  key={data._id}
                  src={src}
                  className="w-full"
                  alt={data.title}
                />
              ))}
            </Slider>
          ) : (
            <img src={data.imageCover} className="w-full" alt={data.title} />
          )}
        </div>
        <div className="col-span-8">
          <h2 className="h4 dark:text-white">{data.title}</h2>
          <p className="text-gray-600 px-4 my-3 dark:text-gray-300 font-light">
            {data.description}
          </p>

          <h2 className="text-green-600 font-medium h4 ">
            {data.category.name}
          </h2>
          <div className="flex justify-between items-center">
            <h5>
              <span
                className={`me-2  ${
                  data.priceAfterDiscount
                    ? "text-red-600 line-through"
                    : "dark:text-white"
                }`}
              >
                {data.price}
              </span>
              <span className="dark:text-white">{data.priceAfterDiscount}</span>
            </h5>
            <div className="flex justify-center items-center">
              <FaStar className="text-yellow-400" />
              <h5 className="dark:text-white ms-2 text-gray-600">
                {data.ratingsAverage}
              </h5>
            </div>
          </div>
          <button
            onClick={() => handleAddProductToCart(data._id)}
            className="bg-green-600 text-white text-center w-full rounded-lg mt-3 py-1"
          >
            {btnLoading ? (
              <FaSpinner className="fa-spin inline-block text-xl" />
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      {/* related products */}
      <div className="grid mt-10 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {relatedProducts?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
