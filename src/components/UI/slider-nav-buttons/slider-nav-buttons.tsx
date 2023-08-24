import { RefObject } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

import "./slider-nav-buttons.scss";

const SliderNavButtons = ({
  prevRef,
  nextRef,
}: {
  prevRef: RefObject<HTMLButtonElement>;
  nextRef: RefObject<HTMLButtonElement>;
}) => {
  return (
    <div className="slider-nav">
      <button
        className="btn-reset slider-nav__btn slider-nav__btn--prev"
        ref={prevRef}
      >
        <BiSolidChevronLeft
          size={42}
          className="slider-nav__icon slider-nav__icon--prev"
        />
      </button>
      <button
        className="btn-reset slider-nav__btn slider-nav__btn--next"
        ref={nextRef}
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
