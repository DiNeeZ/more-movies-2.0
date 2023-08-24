import { useRef, Children, ReactNode } from "react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderNavButtons } from "../UI";

import "swiper/css/pagination";
import "./hero-slider.scss";

const HeroSlider = ({ children }: { children: ReactNode }) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      loop={true}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      pagination
      className="hero-slider"
    >
      <SliderNavButtons
        prevRef={navigationPrevRef}
        nextRef={navigationNextRef}
      />

      {Children.map(children, (child) => (
        <SwiperSlide className="hero-slider__item">{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
