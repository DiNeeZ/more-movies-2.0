import { useEffect, useState } from "react";
import placeholderImage from "../../assets/images/no-image.jpg";
import blurredImage from "../../assets/images/blurred.jpeg";

import "./custom.image.scss";

interface ImageProps {
  alt: string;
  width?: string | number;
  height?: string | number;
}

interface PreloadImageProps extends ImageProps {
  src: {
    image: string;
    preview: string;
  };
}

interface CustomImageProps extends ImageProps {
  src:
    | {
        image: string;
        preview: string;
      }
    | undefined;
}

const PreloadImage = ({ src, alt, width, height }: PreloadImageProps) => {
  const [isImageError, setIsImageError] = useState(false);
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = src?.image ?? placeholderImage;
        loadImg.onload = () => resolve(src?.image ?? placeholderImage);
        loadImg.onerror = (err) => reject(err);
      });
    };

    const loadPreview = () => {
      return new Promise((resolve, reject) => {
        const loadPreview = new Image();
        loadPreview.src = src?.preview ?? placeholderImage;
        loadPreview.onload = () => resolve(src?.preview ?? placeholderImage);
        loadPreview.onerror = (err) => reject(err);
      });
    };

    loadPreview()
      .then()
      .catch(() => setIsPreviewError(true));

    loadImage()
      .then(() => setIsLoaded(true))
      .catch(() => setIsImageError(true));
  });

  const previewSrc = isPreviewError ? blurredImage : src.preview;
  const imageSrc = isImageError ? placeholderImage : src.image;

  return (
    <img
      src={!isLoaded ? previewSrc : imageSrc}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

const CustomImage = ({ src, alt, width, height }: CustomImageProps) =>
  src ? (
    <PreloadImage src={src} width={width} height={height} alt={alt} />
  ) : (
    <img src={placeholderImage} alt={alt} width={width} height={height} />
  );

export default CustomImage;
