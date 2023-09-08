import { PhotoGallery } from "../../components";
import { getImages } from "../../api/tmdb";
import { useQuery } from "react-query";

interface DetailsImagesProps {
  id: string;
  mediaType: "movie" | "tv";
  title: string;
}

const DetailsImages = ({ id, mediaType, title }: DetailsImagesProps) => {
  const imageQuery = useQuery(`images-${id}`, () =>
    getImages({ id, mediaType })
  );

  if (imageQuery.isSuccess) {
    return (
      <div>
        DetailsImages
        <PhotoGallery images={imageQuery.data} title={title} />
      </div>
    );
  }
};

export default DetailsImages;
