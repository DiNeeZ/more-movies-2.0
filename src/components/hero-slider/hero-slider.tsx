import { useRef, Children, ReactNode } from "react";
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
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

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
