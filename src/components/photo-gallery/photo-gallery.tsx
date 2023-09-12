import { useState } from "react";

import { CustomImage } from "..";
import { CustomSliderNavBtns } from "../UI";

import "./photo-gallery.scss";

// Types
interface ImageSource {
  image: string;
  preview: string;
}

interface PhotoGalleryProps {
  images: (ImageSource | undefined)[];
  title: string;
}

/* -------------------------------------------------------------------------------- */

// Gallery Content Component
const PhotoGallery = ({ images, title }: PhotoGalleryProps) => {
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
      <div className="photo-gallery">
        <div className="photo-gallery__counter">
          {currentImageIndex + 1} of {images.length}
        </div>
        <CustomImage src={images[currentImageIndex]} alt={title} />
      </div>
      <div className="photo-gallery__nav">
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

export default PhotoGallery;
