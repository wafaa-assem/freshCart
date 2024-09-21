import Slider from "react-slick";
import img_1 from "./../../assets/images/slider-image-1.jpeg";
import img_2 from "./../../assets/images/slider-image-2.jpeg";
import img_3 from "./../../assets/images/slider-image-3.jpeg";
import img_5 from "./../../assets/images/slider-2.jpeg";
import img_6 from "./../../assets/images/ecommerce-development.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    appendDots: (dots) => (
      <div className="custom-dots">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="custom-dot"></div>,
  };

  return (
    <div className="grid grid-cols-12">
      {/* Slider section for all screens */}
      <div className="col-span-12 md:col-span-8">
        <Slider {...settings}>
          <img
            src={img_6}
            className="w-full sm:h-[300px] h-[175px] "
            alt="slider"
          />
          <img
            src={img_2}
            className="w-full sm:h-[300px] h-[175px] "
            alt="slider"
          />
          <img
            src={img_5}
            className="w-full sm:h-[300px] h-[175px] "
            alt="slider"
          />
        </Slider>
      </div>

      {/* Additional images section hidden on smaller screens */}
      <div className="col-span-12 md:col-span-4 hidden md:block">
        <img src={img_1} className="w-full h-[150px]" alt="slider" />
        <img src={img_3} className="w-full h-[150px]" alt="slider" />
      </div>
    </div>
  );
}
