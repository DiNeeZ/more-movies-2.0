import { useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { TbVideoMinus, TbPhoto } from "react-icons/tb";

import {
  CustomImage,
  Modal,
  PhotoGallery,
  Player,
  Section,
  Video,
} from "../../components";
import { getImages, getTrailers } from "../../api/tmdb";
import { BaseImage, Images } from "../../models/image-model";
import { getBackdropPath, getPosterPath } from "../../utils/helpers";

import "./details-media.scss";

//Types
interface DetailsMediaProps {
  id: string;
  mediaType: "movie" | "tv";
  title: string;
}
/* -------------------------------------------------------------------------------- */

// Helper functions
const filterImagesToSingleLanguage = (images: BaseImage[], lang: string) =>
  images.filter((image) => image.iso6391 === null || image.iso6391 === lang);

const getPosterPathForBtn = (images: Images) => {
  const engPosters = filterImagesToSingleLanguage(images.posters, "en");
  const allPosters = images.posters;
  return engPosters.length
    ? getPosterPath(engPosters[0]?.filePath)
    : getPosterPath(allPosters[0]?.filePath);
};

const getGalleryImages = (images: Images) => {
  const backdrops = filterImagesToSingleLanguage(images.backdrops, "en");
  return backdrops.map((backdrop) => getBackdropPath(backdrop.filePath));
};
/* -------------------------------------------------------------------------------- */

// Details Media Component
const DetailsMedia = ({ id, mediaType, title }: DetailsMediaProps) => {
  const [isTrailersOpen, setIsTrailersOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  //Fetch trailers
  const trailersQuery = useQuery(`${title}-trailers`, () =>
    getTrailers({
      id,
      mediaType,
    })
  );
  //Fetch images
  const imageQuery = useQuery(`images-${id}`, () =>
    getImages({ id, mediaType })
  );

  //Handlers
  const handleTrailersOpen = () => {
    setIsGalleryOpen(false);
    setIsTrailersOpen(true);
  };
  const handleGalleryOpen = () => {
    setIsTrailersOpen(false);
    setIsGalleryOpen(true);
  };

  if (imageQuery.isSuccess && trailersQuery.isSuccess) {
    const images = getGalleryImages(imageQuery.data);
    return (
      <Section className="details-media">
        {/* Previews */}
        <div className="details-media__previews">
          <button
            onClick={handleGalleryOpen}
            className="btn-reset details-media__gallery"
            aria-label="open gallery"
          >
            <CustomImage
              src={getPosterPathForBtn(imageQuery.data)}
              alt={`${title}-image-btn`}
            />
          </button>
          <Player trailer={trailersQuery.data[0]} />
        </div>
        {/* Buttons */}
        <div className="details-media__buttons">
          <button
            disabled={!trailersQuery.data.length}
            className="btn-reset details-media__btn"
            onClick={handleTrailersOpen}
          >
            <TbVideoMinus size={22} />
            <span>{trailersQuery.data.length} VIDEOS</span>
          </button>
          <button
            disabled={!images.length}
            className="btn-reset details-media__btn"
            onClick={handleGalleryOpen}
          >
            <TbPhoto size={22} />
            <span>{images.length} PHOTOS</span>
          </button>
        </div>
        {/* Modals */}
        {isTrailersOpen && (
          <AnimatePresence>
            <Modal width={80} handleClose={() => setIsTrailersOpen(false)}>
              <Video trailers={trailersQuery.data} />
            </Modal>
          </AnimatePresence>
        )}
        {isGalleryOpen && (
          <AnimatePresence>
            <Modal handleClose={() => setIsGalleryOpen(false)}>
              <PhotoGallery title={title} images={images} />
            </Modal>
          </AnimatePresence>
        )}
        {/* End Modals */}
      </Section>
    );
  }
};
/* -------------------------------------------------------------------------------- */

export default DetailsMedia;
