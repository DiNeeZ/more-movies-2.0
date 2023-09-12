import { useState, useTransition } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { BsYoutube, BsCameraVideoOff } from "react-icons/bs";

import { Trailer } from "../../models/trailers-model";

import "./player.scss";

const NoVideo = () => (
  <div className="player player--no-video">
    <BsCameraVideoOff size={60} />
    <p>There is no video</p>
  </div>
);

const Player = ({ trailer }: { trailer: Trailer }) => {
  const [, startTransition] = useTransition();
  const [showVideo, setShowVideo] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onReady = (event: YouTubeEvent<unknown>) => {
    setHasLoaded(true);
    event.target.playVideo();
  };

  const handleThumbnailClick = () => {
    startTransition(() => {
      setShowVideo(true);
    });
  };

  if (!trailer) return <NoVideo />;

  return (
    <div className="player">
      {(!showVideo || !hasLoaded) && (
        <button className="thumbnail" onClick={handleThumbnailClick}>
          <div className="player__inner">
            <img
              alt={trailer.name}
              src={`https://i.ytimg.com/vi/${trailer.key}/maxresdefault.jpg`}
              className="thumbnail-image"
              loading="lazy"
            />
            <div className="payer__play-yt play-yt">
              <BsYoutube size={68} className="play-yt__icon" />
            </div>
          </div>
        </button>
      )}
      {showVideo && (
        <YouTube
          videoId={trailer.key}
          onReady={onReady}
          className="player__inner"
          iframeClassName="player__inner"
        />
      )}
    </div>
  );
};

export default Player;
