import { CustomImage } from "..";
import { Genre } from "../../models/genre-model";
import "./card.scss";

interface CardProps {
  srcSet:
    | {
        image: string;
        preview: string;
      }
    | undefined;
  title: string;
  genres: Genre[];
}

const Card = ({ srcSet, title, genres }: CardProps) => {
  return (
    <article className="card">
      <div className="movie-card__card card">
        <div className="card__image-wrapper">
          <CustomImage src={srcSet} alt={title} width={372} height={558} />
        </div>
      </div>
      <span className="card__title">{title}</span>
      <ul className="genres">
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </article>
  );
};

export default Card;
