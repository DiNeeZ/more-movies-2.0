import { Link } from "react-router-dom";
import moment from "moment";

import { CustomImage } from "..";
import Genres from "../genres/genres";
import { Genre } from "../../models/genre-model";

import "./card.scss";
import { TrandingTv } from "../../models/tv-model";
import { TrandingMovie } from "../../models/movie-model";

interface CardProps {
  info: TrandingTv | TrandingMovie;
  srcSet:
    | {
        image: string;
        preview: string;
      }
    | undefined;
  genres: Genre[];
}

const Card = ({ info, srcSet, genres }: CardProps) => {
  const { id, title, releaseDate } = info;
  const releaseYear = releaseDate
    ? moment(new Date(releaseDate)).format("YYYY")
    : null;

  return (
    <article className="card">
      <Link className="card__link" to={`/${id}`}>
        <div className="">
          <div className="card__image-wrapper">
            <CustomImage src={srcSet} alt={title} width={372} height={558} />
          </div>
        </div>
        <div className="card__descr card-descr">
          <h3 className="card-descr__title">{title}</h3>
          {!!genres.length && <Genres genres={genres} />}
          <div className="card-descr__release-year">{releaseYear}</div>
        </div>
      </Link>
    </article>
  );
};

export default Card;
