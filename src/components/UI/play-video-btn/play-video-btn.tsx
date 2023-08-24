import { MdOutlinePlayCircle } from "react-icons/md";
import "./play-video-btn.scss";

interface PlayVideoBtnProps {
  handleClick?: () => void;
}

const PlayVideoBtn = ({ handleClick }: PlayVideoBtnProps) => {
  return (
    <button className="trailer-btn" onClick={handleClick}>
      <span className="trailer-btn__text">Watch Trailer</span>
      <MdOutlinePlayCircle className="trailer-btn__icon" />
    </button>
  );
};

export default PlayVideoBtn;
