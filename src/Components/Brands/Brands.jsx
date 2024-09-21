import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const { data, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/brands"),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Brands</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="grid mt-8 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((brand) => (
          <div
            key={brand._id}
            className="bg-gray-100 rounded-full flex items-center justify-center w-full aspect-square"
          >
            <img
              src={brand.image}
              className="rounded-full w-4/5 h-4/5 "
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
