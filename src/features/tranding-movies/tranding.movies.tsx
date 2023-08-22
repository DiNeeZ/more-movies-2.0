import { useQuery } from "react-query";

import { getGenres, getTrendingMovies } from "../../api/tmdb";
import { extractGenres, getPosterPath } from "../../utils/helpers";
import { CardGrid, Section } from "../../components";
import { Card } from "../../components";
import { ColorfulSectionTitle } from "../../components/UI";
import type { TrandingMovie } from "../../models/movie-model";

import "./tranding.movies.scss";

const TrandingMovies = () => {
  const genresQuery = useQuery("genres", getGenres);
  const trandingMoviesQuery = useQuery("tranding-movies", getTrendingMovies);

  console.log(genresQuery.data);

  const renderMoviesGrid = (movie: TrandingMovie) => {
    const genres = extractGenres(genresQuery.data!, movie.genreIds);
    const srcSet = getPosterPath(movie.posterPath);
    return <Card key={movie.id} info={movie} srcSet={srcSet} genres={genres} />;
  };

  if (trandingMoviesQuery.isLoading || genresQuery.isLoading)
    return <h1>Loading...</h1>;

  if (trandingMoviesQuery.isError) {
    if (trandingMoviesQuery.error instanceof Error) {
      return <h1>{trandingMoviesQuery.error.message}</h1>;
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

  if (trandingMoviesQuery.isSuccess && genresQuery.isSuccess) {
    return (
      <Section>
        <ColorfulSectionTitle>Popular Movies</ColorfulSectionTitle>
        <CardGrid>
          {trandingMoviesQuery.data.results.map(renderMoviesGrid)}
        </CardGrid>
      </Section>
    );
  }
};

export default TrandingMovies;
