import { useQuery } from "react-query";

import { getGenres, getTrendingTvs } from "../../api/tmdb";
import { extractGenres, getPosterPath } from "../../utils/helpers";
import { Section, Card, CardGrid } from "../../components";
import type { TrandingTv } from "../../models/tv-model";

import "./tranding.tv.scss";
import { ColorfulSectionTitle } from "../../components/UI";

const TrandingTvs = () => {
  const genresQuery = useQuery("genres", getGenres);
  const trandingTvsQuery = useQuery("tranding-tvs", getTrendingTvs);

  const renderTvsGrid = (movie: TrandingTv) => {
    const genres = extractGenres(genresQuery.data!, movie.genre_ids);
    const srcSet = getPosterPath(movie.poster_path);
    return (
      <Card key={movie.id} srcSet={srcSet} title={movie.name} genres={genres} />
    );
  };

  if (trandingTvsQuery.isLoading || genresQuery.isLoading)
    return <h1>Loading...</h1>;

  if (trandingTvsQuery.isError) {
    if (trandingTvsQuery.error instanceof Error) {
      return <h1>{trandingTvsQuery.error.message}</h1>;
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

  if (trandingTvsQuery.isSuccess && genresQuery.isSuccess) {
    return (
      <Section className="tranding-tv-section">
        <ColorfulSectionTitle>Popular Shows</ColorfulSectionTitle>
        <CardGrid>{trandingTvsQuery.data.results.map(renderTvsGrid)}</CardGrid>
      </Section>
    );
  }
};

export default TrandingTvs;
