import { useState, useTransition } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { BsYoutube } from "react-icons/bs";

import { Trailer } from "../../models/trailers-model";

import "./player.scss";

const Player = ({ trailer }: { trailer: Trailer }) => {
  const [, startTransition] = useTransition();
  const [showVideo, setShowVideo] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const onReady = (event: YouTubeEvent<unknown>) => {
    setHasLoaded(true);
    event.target.playVideo();
  };

  return (
    <div className="player">
      {(!showVideo || !hasLoaded) && (
        <button
          className="thumbnail"
          onClick={() => {
            startTransition(() => {
              console.log(showVideo);
              setShowVideo(true);
            });
          }}
        >
          <div className="payer__inner">
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
