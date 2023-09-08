import { useQuery } from "react-query";

import { getImages } from "../../api/tmdb";
import { BaseImage } from "../../models/image-model";
import { getLogoImagePath } from "../../utils/helpers";

import "./details-title.scss";

interface DetailsImagesProps {
  id: string;
  mediaType: "movie" | "tv";
  title: string;
}

const renderLogoImg = (logoImg: BaseImage, title: string) => {
  const src = getLogoImagePath(logoImg.filePath);
  return (
    <div className="details-title__logo">
      <img className="details-title__logo-img" src={src} alt={title} />
    </div>
  );
};

const DetailsTitle = ({ id, mediaType, title }: DetailsImagesProps) => {
  const imageQuery = useQuery(`images-${id}`, () =>
    getImages({ id, mediaType })
  );

  if (imageQuery.isSuccess) {
    const { logos } = imageQuery.data;

    const logoImg =
      logos.length &&
      logos
        .filter((logo) => logo.iso6391 === "en")
        .sort((a, b) => a.width - b.width)[0];

    return (
      <div className="details-title">
        {logoImg ? (
          renderLogoImg(logoImg, title)
        ) : (
          <h1 className="details-title__title">{title}</h1>
        )}
      </div>
    );
  }
};

export default DetailsTitle;
