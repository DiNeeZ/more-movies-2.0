import { Children, ReactNode } from "react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderNavButtons } from "../UI";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero-slider.scss";

interface HeroSliderProps {
  children: ReactNode;
}

const HeroSlider = ({ children }: HeroSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, A11y]}
      slidesPerView={1}
      effect="fade"
      loop={true}
      spaceBetween={30}
      centeredSlides={true}
      speed={600}
      autoplay={{
        delay: 10000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      pagination
      className="hero-slider"
    >
      <SliderNavButtons loop={true} />

      {Children.map(children, (child) => (
        <SwiperSlide className="hero-slider__item">{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
