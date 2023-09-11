import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "./custom-slider-nav-btns.scss";

interface CustomSliderNavBtnsProps {
  currentSlide: number;
  totalSlides: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}

const CustomSliderNavBtns = (props: CustomSliderNavBtnsProps) => {
  return (
    <>
      <button
        className="custom-slider-nav-btn custom-slider-nav-btn--left"
        onClick={props.handleLeftClick}
        disabled={props.currentSlide <= 0}
      >
        <FaCaretLeft className="custom-slider-nav-btn__btn-icon" />
      </button>
      <button
        className="custom-slider-nav-btn custom-slider-nav-btn--right"
        onClick={props.handleRightClick}
        disabled={props.currentSlide >= props.totalSlides - 1}
      >
        <FaCaretRight className="custom-slider-nav-btn__btn-icon" />
      </button>
    </>
  );
};

export default CustomSliderNavBtns;
