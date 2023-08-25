import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { ImFilm } from "react-icons/im";
import { MdNotInterested } from "react-icons/md";
import { FaSadTear } from "react-icons/fa";

import { ErrorIndicator, SpinnerBounce } from "../UI";

import "./video.scss";

const VideoNotAvaliable = () => {
  return (
    <div className="not-avaliable">
      <div className="not-avaliable__wrapper">
        <div className="not-avaliable__content">
          <div className="not-avaliable__icon">
            <ImFilm className="icon-film" />
            <MdNotInterested className="icon-not" />
          </div>
          <div className="not-avaliable__text">Video Not Avaliable</div>
          <FaSadTear className="not-avaliable__sad" />
        </div>
      </div>
    </div>
  );
};

const VideoNav = (props) => {
  const {
    trailers,
    currentVideo,
    handleLeftClick,
    handleRightClick,
    handleDotClick,
  } = props;

  return (
    <div className="video-nav">
      <button
        className="video-nav__btn video-nav__btn--left"
        onClick={handleLeftClick}
        disabled={currentVideo <= 0}
      >
        <FaCaretLeft className="video-nav__btn-icon" />
      </button>
      <button
        className="video-nav__btn video-nav__btn--right"
        onClick={handleRightClick}
        disabled={currentVideo >= trailers.length - 1}
      >
        <FaCaretRight className="video-nav__btn-icon" />
      </button>
      <div className="video-nav__dots">
        {trailers.map((trailer, idx) => (
          <span
            className={`video-nav__dot ${
              currentVideo === idx ? "video-nav__dot--current" : ""
            }`}
            key={trailer.id}
            onClick={() => handleDotClick(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Video = () => {
  return <div>Video</div>;
};

export default Video;
