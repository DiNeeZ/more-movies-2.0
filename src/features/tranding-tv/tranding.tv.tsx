import { useQuery } from "react-query";

import { getGenres, getTrendingTvs } from "../../api/tmdb";
import { extractGenres, getPosterPath } from "../../utils/helpers";
import { Section, Card, CardGrid } from "../../components";
import { ColorfulSectionTitle } from "../../components/UI";
import type { Media } from "../../models/media-model";

import "./tranding.tv.scss";

const TrandingTvs = () => {
  const genresQuery = useQuery("genres", getGenres);
  const trandingTvsQuery = useQuery("tranding-tvs", getTrendingTvs);

  const renderTvsGrid = (show: Media) => {
    const genres = extractGenres(genresQuery.data!, show.genreIds);
    const srcSet = getPosterPath(show.posterPath);
    return <Card key={show.id} info={show} srcSet={srcSet} genres={genres} />;
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
