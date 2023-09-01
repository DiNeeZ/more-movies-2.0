import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";

import { getGenres, getTrailers, getUpcoming } from "../../api/tmdb";
import {
  CustomImage,
  Genres,
  HeroSlider,
  Modal,
  Video,
} from "../../components";
import { PlayVideoBtn } from "../../components/UI";
import {
  extractGenres,
  getBackdropPath,
  shuffleArray,
} from "../../utils/helpers";
import { Genre } from "../../models/genre-model";
import type { Media } from "../../models/media-model";
import useScrollLock from "../../hooks/use-scroll-lock";

import "./hero.scss";

interface HeroContentProps {
  movie: Media;
  genres: Genre[];
  backdrop:
    | {
        preview: string;
        image: string;
      }
    | undefined;
}

const HeroContent = (props: HeroContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const trailersQuery = useQuery(`${props.movie.title}-trailers`, () =>
    getTrailers({ id: props.movie.id, mediaType: props.movie.mediaType })
  );

  const modalVideoOpen = () => {
    setIsModalOpen(true);
    lockScroll();
  };

  const modalVideoClose = () => {
    setIsModalOpen(false);
    unlockScroll();
  };

  return (
    <>
      <div className="upcoming-movies__image-wrapper">
        <CustomImage src={props.backdrop} alt={props.movie.title} />
      </div>
      <div className="container upcoming-movies__content-container">
        <div className="upcoming-movies__content">
          <div className="upcoming-movies__text">
            <h2 className="upcoming-movies__title">{props.movie.title}</h2>
            <Genres genres={props.genres} />
          </div>
          {trailersQuery.isSuccess && !!trailersQuery.data.length && (
            <PlayVideoBtn handleClick={modalVideoOpen} />
          )}
          <AnimatePresence>
            {isModalOpen && trailersQuery.isSuccess && (
              <Modal handleClose={modalVideoClose}>
                <Video trailers={trailersQuery.data} />
              </Modal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const genresQuery = useQuery("genres", getGenres);
  const upcomingQuery = useQuery("upcoming", getUpcoming);
  const [movies, setMovies] = useState<Array<Media>>([]);

  const SLIDER_ITEMS_QTY = 5;

  useEffect(() => {
    if (upcomingQuery.isSuccess) {
      const slicedAndShuffledMovies = (
        shuffleArray(upcomingQuery.data.results) as Array<Media>
      ).slice(0, SLIDER_ITEMS_QTY);
      setMovies(slicedAndShuffledMovies);
    }
  }, [upcomingQuery.data?.results, upcomingQuery.isSuccess]);

  if (upcomingQuery.isLoading || genresQuery.isLoading)
    return <h1>Loading...</h1>;

  if (upcomingQuery.isError) {
    if (upcomingQuery.error instanceof Error) {
      return <h1>{upcomingQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (genresQuery.isError) {
    if (genresQuery.error instanceof Error) {
      return <h1>{genresQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (upcomingQuery.isSuccess) {
    return (
      <section className="upcoming-movies">
        <HeroSlider>
          {movies.map((movie) => {
            const genres = extractGenres(genresQuery.data!, movie.genreIds);
            const backdrop = getBackdropPath(movie.backdropPath, "original");
            return (
              <Fragment key={movie.id}>
                <HeroContent
                  genres={genres}
                  backdrop={backdrop}
                  movie={movie}
                />
              </Fragment>
            );
          })}
        </HeroSlider>
      </section>
    );
  }
};

export default Hero;
