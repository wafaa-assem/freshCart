import Slider from "react-slick";
import { Hearts } from "react-loader-spinner";
import useCategories from "../../CustomHooks/useCategories";

export default function CategorySlider() {
  //custom hook
  const { data, isLoading } = useCategories();
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // large screens (lg)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // medium screens (md)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // small screens (sm)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  if (isLoading) {
    return (
      <div className=" flex justify-center my-7">
        <Hearts
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <Slider {...settings} className="mt-8">
        {data?.map((category) => (
          <div key={category._id} className="p-1">
            <img
              src={category.image}
              className="w-full h-[200px]"
              alt={category.name}
            />
            <h3 className="font-serif mt-2 text-center text-sm dark:text-white">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
