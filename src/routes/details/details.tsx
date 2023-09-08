import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { BsDot } from "react-icons/bs";

import { CustomImage, Section, Genres } from "../../components";
import { getMovie } from "../../api/tmdb";

import { getBackdropPath, transformDate } from "../../utils/helpers";
import { FullRating } from "../../features";

import "./details.scss";
import { MovieDetails, TVDetails } from "../../models/details-model";

type DetailsParams = {
  id: string;
  mediaType: "movie" | "tv";
};

const Details = () => {
  const { id, mediaType } = useParams<keyof DetailsParams>() as DetailsParams;
  const detailsQuery = useQuery(`details-${id}`, () =>
    getMovie({ id, mediaType })
  );

  if (detailsQuery.isLoading) return <h1>Loading...</h1>;

  if (detailsQuery.isError) {
    if (detailsQuery.error instanceof Error) {
      return <h1>{detailsQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (detailsQuery.isSuccess) {
    const details = detailsQuery.data;
    const mediaType = details.mediaType;
    const movieDetails =
      details.mediaType === "movie" && (details as MovieDetails);
    const tvDetails = details.mediaType === "tv" && (details as TVDetails);
    const backdrop = getBackdropPath(details.backdropPath, "original");

    const credentials = {
      id,
      mediaType,
      imdbId: details.imdbId,
      title: details.title,
      tmdbRating: { count: details.voteCount, average: details.voteAverage },
    };

    const renderMovieTime = (details: MovieDetails) => {
      const hours = Math.ceil(details.runtime / 60);
      const minutes = details.runtime % 60;

      return (
        <>
          {transformDate(details.releaseDate)}
          <BsDot />
          {`${hours}h ${minutes}m`}
        </>
      );
    };

    const renderTvTime = (details: TVDetails) => {
      const start = details.releaseDate.split("-")[0];
      const finishYear = details.lastAirDate
        ? details.lastAirDate.split("-")[0]
        : "";
      const finish =
        details.status === "Ended" ? finishYear + " (finished)" : "...";

      return (
        <>
          TV Siries
          <BsDot />
          {`${start} - ${finish}`}
          {!!details.episodeRunTime.length && (
            <>
              <BsDot />
              ep. ~ {`${details.episodeRunTime}m`}
            </>
          )}
        </>
      );
    };

    return (
      <main className="main details">
        <Section className="details-hero">
          <div className="details-hero__image">
            <CustomImage src={backdrop} alt={details.title} />
          </div>
          <div className="content">
            <h1 className="details__title">{details.title}</h1>
            <p className="details__overview">{details.overview}</p>
            {!!details.genres.length && <Genres genres={details.genres} />}
            <div className="details__info">
              <FullRating credentials={credentials} />
              <div className="details__additional-info additional-info">
                <span className="additional-info__item additional-info__item--time">
                  {movieDetails && renderMovieTime(movieDetails)}
                  {tvDetails && renderTvTime(tvDetails)}
                </span>
                {tvDetails && (
                  <p className="movie-descr__episodes">
                    <span>Seasons: {tvDetails.numberOfSeasons}</span>
                    <BsDot />
                    <span>Episodes: {tvDetails.numberOfEpisodes}</span>
                  </p>
                )}
                {movieDetails && movieDetails.budget && (
                  <span className="additional-info__item additional-info__item--budget">
                    <em className="additional-info__label">Budget</em>
                    <span>
                      {movieDetails.budget === 0
                        ? "N/A"
                        : movieDetails.budget.toLocaleString() + " $"}
                    </span>
                  </span>
                )}
                {movieDetails && movieDetails.revenue && (
                  <span className="additional-info__item additional-info__item--revenue">
                    <em className="additional-info__label">Box Office</em>
                    <span>
                      {movieDetails.revenue === 0
                        ? "N/A"
                        : movieDetails.revenue.toLocaleString() + " $"}
                    </span>
                  </span>
                )}
                {details.tagline && (
                  <span className="additional-info__item additional-info__item--tagline">
                    "{details.tagline}"
                  </span>
                )}
              </div>
            </div>
          </div>
        </Section>
      </main>
    );
  }
};

export default Details;
