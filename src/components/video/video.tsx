import { useState } from "react";

import { Player } from "..";
import { Trailer } from "../../models/trailers-model";
import { CustomSliderNavBtns } from "../UI";

import "./video.scss";

// Types
interface VideoNavProps {
  trailers: Array<Trailer>;
  currentVideo: number;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  handleDotClick: (index: number) => void;
}
/* -------------------------------------------------------------------------------- */

// Video Navigation Component
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
      <CustomSliderNavBtns
        totalSlides={trailers.length}
        currentSlide={currentVideo}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
      />

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
/* -------------------------------------------------------------------------------- */

// Video Component
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
/* -------------------------------------------------------------------------------- */

export default Video;
