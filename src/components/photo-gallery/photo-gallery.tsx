import { CustomImage } from "..";
import { BaseImage, Images } from "../../models/image-model";
import { getPosterPath } from "../../utils/helpers";
import "./photo-gallery.scss";

const getImageId = (filepath: string) => {
  const indexStart = filepath.indexOf("/") + 1;
  const indexEnd = filepath.indexOf(".");
  return filepath.substring(indexStart, indexEnd);
};

const filterImagesToSingleLanguage = (images: BaseImage[], lang: string) => {
  return images.filter(
    (image) => image.iso6391 === null || image.iso6391 === lang
  );
};

const PhotoGallery = ({ images, title }: { images: Images; title: string }) => {
  const posters = filterImagesToSingleLanguage(images.posters, "en");
  const backdrops = filterImagesToSingleLanguage(images.backdrops, "en");

  return (
    <div>
      {[...posters, ...backdrops].map((image) => {
        const srcSet = getPosterPath(image.filePath);
        const imageId = getImageId(image.filePath);
        return <CustomImage key={imageId} src={srcSet} alt={title} />;
      })}
    </div>
  );
};

export default PhotoGallery;
