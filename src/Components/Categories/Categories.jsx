import { Helmet } from "react-helmet";
import useCategories from "../../CustomHooks/useCategories";
import Loading from "../Loading/Loading";

export default function Categories() {
  //custom hook
  const { data, isLoading } = useCategories();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="grid mt-8 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((category) => (
          <div
            key={category._id}
            className="bg-gray-200 rounded-3xl shadow-lg p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={category.image}
              className="w-full rounded-3xl mb-3 object-cover"
              alt={category.name}
            />
            <h4 className="text-center text-lg font-semibold text-gray-700">
              {category.name}
            </h4>
          </div>
        ))}
      </div>
    </>
  );
}
