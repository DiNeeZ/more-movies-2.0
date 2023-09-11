import { useState } from "react";
import { CustomImage, Modal } from "..";
import { BaseImage, Images } from "../../models/image-model";
import { getBackdropPath, getPosterPath } from "../../utils/helpers";
import "./photo-gallery.scss";
import { CustomSliderNavBtns } from "../UI";

// Types
interface ImageSource {
  image: string;
  preview: string;
}

interface GalleryContentProps {
  images: (ImageSource | undefined)[];
  title: string;
}
/* -------------------------------------------------------------------------------- */

// Helper function
const filterImagesToSingleLanguage = (images: BaseImage[], lang: string) =>
  images.filter((image) => image.iso6391 === null || image.iso6391 === lang);
/* -------------------------------------------------------------------------------- */

// Gallery Content Component
const GalleryContent = ({ images, title }: GalleryContentProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevState) => prevState - 1);
    }
  };

  const handleRightClick = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <div className="gallery-content">
        <div className="gallery-content__counter">
          {currentImageIndex + 1} of {images.length}
        </div>
        <CustomImage src={images[currentImageIndex]} alt={title} />
      </div>
      <div className="gallery-content__nav">
        <CustomSliderNavBtns
          currentSlide={currentImageIndex}
          totalSlides={images.length}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
      </div>
    </>
  );
};
/* -------------------------------------------------------------------------------- */

// Photo Gallery Component
const PhotoGallery = ({ images, title }: { images: Images; title: string }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const posters = filterImagesToSingleLanguage(images.posters, "en");
  const backdrops = filterImagesToSingleLanguage(images.backdrops, "en");
  const btnImageSrc = getPosterPath(posters[0].filePath);
  const photos = backdrops.map((backdrop) =>
    getBackdropPath(backdrop.filePath)
  );

  const handleGalleryOpen = () => setIsGalleryOpen(true);
  const handleGalleryClose = () => setIsGalleryOpen(false);

  return (
    <div>
      <button
        onClick={handleGalleryOpen}
        className="btn-reset gallery__btn"
        aria-label="open gallery"
      >
        <CustomImage src={btnImageSrc} alt={`${title}-image-btn`} />
      </button>
      {isGalleryOpen && (
        <Modal handleClose={handleGalleryClose}>
          <GalleryContent images={photos} title={title} />
        </Modal>
      )}
    </div>
  );
};
/* -------------------------------------------------------------------------------- */

export default PhotoGallery;
