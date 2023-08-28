import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { Trailer } from "../../models/trailers-model";

import "./video.scss";
import Player from "../player/player";

interface VideoNavProps {
  trailers: Array<Trailer>;
  currentVideo: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  handleDotClick: (index: number) => void;
}

const VideoNav = (props: VideoNavProps) => {
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

const Video = ({ trailers }: { trailers: Array<Trailer> }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleLeftClick = () => {
    if (currentVideo > 0) {
      setCurrentVideo((prevState) => prevState - 1);
    }
  };

  const handleRightClick = () => {
    if (currentVideo < trailers.length - 1) {
      setCurrentVideo((prevState) => prevState + 1);
    }
  };

  const handleDotClick = (index: number) => setCurrentVideo(index);

  return (
    <div className="video">
      <Player trailer={trailers[currentVideo]} />
      {trailers.length > 1 && (
        <VideoNav
          trailers={trailers}
          currentVideo={currentVideo}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleDotClick={handleDotClick}
        />
      )}
    </div>
  );
};

export default Video;
