import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getGenres, getUpcoming } from "../../api/tmdb";
import { CustomImage, Genres, HeroSlider, Modal } from "../../components";
import { PlayVideoBtn } from "../../components/UI";
import {
  extractGenres,
  getBackdropPath,
  shuffleArray,
} from "../../utils/helpers";
import { Movie } from "../../models/movie-list-model";

import "./hero.scss";
import { Genre } from "../../models/genre-model";

interface HeroContentProps {
  movie: Movie;
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
          <PlayVideoBtn handleClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <Modal handleClose={() => setIsModalOpen(false)}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis autem sunt unde facilis velit nemo hic.
                Reprehenderit, tempore dolore iste error earum quaerat
                consequuntur quibusdam corrupti, a vitae necessitatibus ipsa.
              </p>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const genresQuery = useQuery("genres", getGenres);
  const upcomingQuery = useQuery("upcoming", getUpcoming);
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const SLIDER_ITEMS_QTY = 5;

  useEffect(() => {
    if (upcomingQuery.isSuccess) {
      const slicedAndShuffledMovies = (
        shuffleArray(upcomingQuery.data.results) as Array<Movie>
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