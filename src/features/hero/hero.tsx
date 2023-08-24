import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getGenres, getUpcoming } from "../../api/tmdb";
import { CustomImage, Genres, HeroSlider } from "../../components";
import { PlayVideoBtn } from "../../components/UI";
import {
  extractGenres,
  getBackdropPath,
  shuffleArray,
} from "../../utils/helpers";
import { Movie } from "../../models/movie-list-model";

import "swiper/css";
import "swiper/css/navigation";
import "./hero.scss";

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
                <div className="upcoming-movies__image-wrapper">
                  <CustomImage src={backdrop} alt={movie.title} />
                </div>
                <div className="container upcoming-movies__content-container">
                  <div className="upcoming-movies__content">
                    <div className="upcoming-movies__text">
                      <h2 className="upcoming-movies__title">{movie.title}</h2>
                      <Genres genres={genres} />
                    </div>
                    <PlayVideoBtn />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </HeroSlider>
      </section>
    );
  }
};

export default Hero;
