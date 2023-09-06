import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { MdOutlineMan } from "react-icons/md";

import { getIMDBRating } from "../../api/omdb";
import { slugify } from "../../utils/helpers";
import IMDBLogo from "../../assets/images/imdb.svg";
import TMDBLogo from "../../assets/images/tmdb.svg";
import MetacriticLogo from "../../assets/images/metacritic.svg";

import "./full-rating.scss";

interface FullRatingProps {
  credentials: {
    id: string;
    mediaType: "movie" | "tv";
    title: string;
    imdbId: string | undefined;
    tmdbRating: {
      average: number;
      count: number;
    };
  };
}

const FullRating = ({ credentials }: FullRatingProps) => {
  const imdbQuery = useQuery(
    `full-rating-${credentials.imdbId ?? credentials.title}`,
    () => getIMDBRating(credentials.imdbId, slugify(credentials.title))
  );

  if (imdbQuery.isSuccess) {
    return (
      <ul className="full-rating">
        <li className="full-rating__item rating-item">
          <Link
            to={`https://www.themoviedb.org/${credentials.mediaType}/${
              credentials.id
            }-${slugify(credentials.title)}`}
            target="_blank"
            className="rating-item__link"
          >
            <img
              width={90}
              height={10}
              className="rating-item__pic"
              src={TMDBLogo}
              alt="TMDB logo"
            />
          </Link>
          <span className="rating-item__nums">
            {credentials.tmdbRating.average.toFixed(1)} / 10 (
            {credentials.tmdbRating.count}{" "}
            <MdOutlineMan style={{ transform: "translateY(3px)" }} />)
          </span>
        </li>
        <li className="full-rating__item rating-item">
          <Link
            to={`https://www.imdb.com/title/${imdbQuery.data.imdbID}`}
            target="_blank"
            className="rating-item__link"
          >
            <img
              width={44}
              height={22}
              className="rating-item__pic"
              src={IMDBLogo}
              alt="IMDB logo"
            />
          </Link>
          <span className="rating-item__nums">
            {imdbQuery.data.imdbRating} / 10 ({imdbQuery.data.imdbVotes}{" "}
            <MdOutlineMan style={{ transform: "translateY(3px)" }} />)
          </span>
        </li>
        <li className="full-rating__item rating-item">
          <Link
            to={`https://www.metacritic.com/${credentials.mediaType}/${slugify(
              credentials.title
            )}`}
            target="_blank"
            className="rating-item__link"
          >
            <img
              width={26}
              height={26}
              className="rating-item__pic"
              src={MetacriticLogo}
              alt="Metacritic logo"
            />
          </Link>

          <span className="rating-item__nums">
            Metascore: {imdbQuery.data.metascore}
          </span>
        </li>
      </ul>
    );
  }
};

export default FullRating;
