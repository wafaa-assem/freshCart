import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Home() {
  const { callinguserCart } = useContext(CartContext);
  const { getLogged } = useContext(WishlistContext);
  useEffect(() => {
    callinguserCart();
    getLogged();
  }, []);
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>FreshCart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
