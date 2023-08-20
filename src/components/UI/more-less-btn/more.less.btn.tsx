import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

import "./more.less.btn.scss";

interface MoreLessBtnProps {
  handleClick: () => void;
  isOpen: boolean;
}

const MoreLessBtn = ({ handleClick, isOpen }: MoreLessBtnProps) => {
  return (
    <button
      className={`more-less-btn more-less-btn--${isOpen ? "opened" : "closed"}`}
      onClick={handleClick}
    >
      <div className="more-less-btn__inner">
        {!isOpen ? "See more" : "See less"}
        {!isOpen ? (
          <BsChevronCompactDown className="more-less-btn__icon more-less-btn__icon--down" />
        ) : (
          <BsChevronCompactUp className="more-less-btn__icon more-less-btn__icon--up" />
        )}
      </div>
    </button>
  );
};

export default MoreLessBtn;
