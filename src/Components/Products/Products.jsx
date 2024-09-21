import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../CustomHooks/useProducts";
import { Helmet } from "react-helmet";

export default function RecentProducts() {
  //    const [allProducts, setAllProducts] = useState([]);
  //    const [isLoading, setIsLoading] = useState(false);

  // async function getAllProducts() {
  //   setIsLoading(true);           // set => re-render component => if true loading work
  //   const { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setAllProducts(data.data);  // data tegy
  //   setIsLoading(false);       // set => re-render tany => if false loading stop
  // }

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // if(isLoading){
  //   return <Loading />
  // }

  //using react-queryyyyyyyyyyy

  const { data, isLoading } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Products</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="grid mt-8 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
