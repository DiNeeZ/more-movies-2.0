import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { BsDot } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";

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
    const backdropMobile = getBackdropPath(details.backdropPath, "mobile");

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
        <div className="details-hero__image-mobile">
          <CustomImage src={backdropMobile} alt={details.title} />
        </div>
        <Section className="details-hero">
          <div className="details-hero__image">
            <CustomImage src={backdrop} alt={details.title} />
          </div>

          <div className="content">
            <h1 className="details__title">{details.title}</h1>
            <p className="details__overview">{details.overview}</p>
            {!!details.genres.length && <Genres genres={details.genres} />}
            <div className="details__info">
              <div className="details__links">
                <FullRating credentials={credentials} />
                {details.homepage && (
                  <div className="details__website-link">
                    <TbWorldWww size={25} />
                    <Link target="_blank" to={details.homepage}>
                      official website
                    </Link>
                  </div>
                )}
              </div>
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
                {movieDetails && movieDetails.budget + 1 && (
                  <span className="additional-info__item additional-info__item--budget">
                    <em className="additional-info__label">Budget</em>
                    <span>
                      {movieDetails.budget === 0
                        ? "N/A"
                        : movieDetails.budget.toLocaleString() + " $"}
                    </span>
                  </span>
                )}
                {movieDetails && movieDetails.revenue + 1 && (
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
        <Section className="details-media">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            iure consequatur totam, repellat, ducimus perspiciatis possimus
            explicabo fuga veniam ut suscipit officiis minus accusantium
            molestiae, assumenda dolorum blanditiis exercitationem praesentium?
          </p>
        </Section>
      </main>
    );
  }
};

export default Details;
