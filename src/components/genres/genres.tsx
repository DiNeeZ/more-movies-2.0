import { convertHexToRGBA } from "../../utils/helpers";
import "./genres.scss";

interface GenresProps {
  genres: {
    id: number;
    name: string;
  }[];
}

const genreColors: { [key: string]: string } = {
  Action: "#ff5733",
  Adventure: "#00aeef",
  Animation: "#88c540",
  Comedy: "#ffd700",
  Crime: "#1f2a38",
  Documentary: "#c0c0c0",
  Drama: "#b22222",
  Family: "#FFC0CB",
  Fantasy: "#800080",
  History: "#8B4513",
  Horror: "#8B0000",
  Music: "#FF4500",
  Mystery: "#2E8B57",
  Romance: "#FF69B4",
  "Science Fiction": "#00FFFF",
  "TV Movie": "#FFD700",
  Thriller: "#FF6347",
  War: "#808080",
  Western: "#DEB887",
};

console.log(genreColors["Music"]);

const Genres = ({ genres }: GenresProps) => {
  return (
    <ul className="genres">
      {genres.slice(0, 3).map((genre) => {
        const backgroundColor = convertHexToRGBA(genreColors[genre.name], 0.3);

        return (
          <li key={genre.id} style={{ backgroundColor }}>
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Genres;
