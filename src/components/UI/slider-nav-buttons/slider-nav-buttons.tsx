import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";

import "./slider-nav-buttons.scss";

const SliderNavButtons = ({ loop = false }: { loop?: boolean }) => {
  const [config, setConfig] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const swiper = useSwiper();

  useEffect(() => {
    if (!loop) {
      swiper.on("slideChange", (swipe) => {
        setConfig({ isBeginning: swipe.isBeginning, isEnd: swipe.isEnd });
      });
    }
  }, [swiper, loop]);

  return (
    <div className="slider-nav">
      <button
        disabled={!loop && config.isBeginning}
        className="btn-reset slider-nav__btn slider-nav__btn--prev"
        onClick={() => swiper.slidePrev()}
      >
        <BiSolidChevronLeft
          size={42}
          className="slider-nav__icon slider-nav__icon--prev"
        />
      </button>
      <button
        disabled={!loop && config.isEnd}
        className="btn-reset slider-nav__btn slider-nav__btn--next"
        onClick={() => swiper.slideNext()}
      >
        <BiSolidChevronRight
          size={42}
          className="slider-nav__icon slider-nav__icon--next"
        />
      </button>
    </div>
  );
};

export default SliderNavButtons;
