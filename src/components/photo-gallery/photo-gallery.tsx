import { CustomImage } from "..";
import { Images } from "../../models/image-model";
import { getPosterPath } from "../../utils/helpers";
import "./photo-gallery.scss";

const PhotoGallery = ({ images, title }: { images: Images; title: string }) => {
  return (
    <div>
      {images.posters.map((poster) => {
        const srcSet = getPosterPath(poster.filePath);

        return <CustomImage src={srcSet} alt={title} />;
      })}
    </div>
  );
};

export default PhotoGallery;
