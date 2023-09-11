import { useQuery } from "react-query";

import { PhotoGallery, Player, Section } from "../../components";
import { getImages, getTrailers } from "../../api/tmdb";

import "./details-media.scss";

interface DetailsMediaProps {
  id: string;
  mediaType: "movie" | "tv";
  title: string;
}

const DetailsMedia = ({ id, mediaType, title }: DetailsMediaProps) => {
  const trailersQuery = useQuery(`${title}-trailers`, () =>
    getTrailers({
      id,
      mediaType,
    })
  );

  const imageQuery = useQuery(`images-${id}`, () =>
    getImages({ id, mediaType })
  );

  if (imageQuery.isSuccess && trailersQuery.isSuccess) {
    return (
      <Section className="details-media">
        <div className="details-media__gabarites">
          <PhotoGallery images={imageQuery.data} title={title} />
          <Player trailer={trailersQuery.data[0]} />
        </div>
      </Section>
    );
  }
};

export default DetailsMedia;
