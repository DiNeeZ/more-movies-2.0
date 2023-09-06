import { Link } from "react-router-dom";
import moment from "moment";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";

import { CustomImage, Genres } from "..";
import { Genre } from "../../models/genre-model";
import { Media } from "../../models/media-model";

import "./card.scss";

interface CardProps {
  info: Media;
  srcSet:
    | {
        image: string;
        preview: string;
      }
    | undefined;
  genres: Genre[];
}

const Card = ({ info, srcSet, genres }: CardProps) => {
  const { id, title, releaseDate, mediaType } = info;
  const releaseYear = releaseDate
    ? moment(new Date(releaseDate)).format("YYYY")
    : null;

  return (
    <article className="card">
      <Link className="card__link" to={`/${mediaType}/${id}`}>
        <div className="">
          <div className="card__image-wrapper">
            <CustomImage src={srcSet} alt={title} width={372} height={558} />
          </div>
        </div>
        <div className="card__descr card-descr">
          <h3 className="card-descr__title">{title}</h3>
          <div className="additional-info">
            <p className="additional-info__rating">
              <AiFillStar
                size={20}
                className="additional-info__icon additional-info__icon--star"
              />
              <span>Rating</span>
              <span>{info.voteAverage.toFixed(1)}</span>
            </p>
            {!!genres.length && <Genres genres={genres} />}
          </div>
          <div className="card-descr__release-year">{releaseYear}</div>
        </div>
        <div className="additional-info-hover">
          <p className="additional-info-hover__overview">{info.overview}</p>
          <p className="additional-info-hover__rating">
            <span>
              <AiFillStar
                size={20}
                className="additional-info-hover__icon additional-info-hover__icon--star"
              />
              {info.voteAverage.toFixed(1)}
            </span>
            <span>
              (
              <AiOutlineUser className="additional-info-hover__icon" />
              {info.voteCount} votes)
            </span>
          </p>
          {!!genres.length && <Genres genres={genres} />}
        </div>
      </Link>
    </article>
  );
};

export default Card;
