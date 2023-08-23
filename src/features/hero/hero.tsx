import { useQuery } from "react-query";

import { getUpcoming } from "../../api/tmdb";

import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.scss";
import { CustomImage } from "../../components";
import { getBackdropPath } from "../../utils/helpers";
import { useRef } from "react";

const Hero = () => {
  const upcomingQuery = useQuery("upcoming", getUpcoming);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  if (upcomingQuery.isLoading) return <h1>Loading...</h1>;

  if (upcomingQuery.isError) {
    if (upcomingQuery.error instanceof Error) {
      return <h1>{upcomingQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (upcomingQuery.isSuccess) {
    return (
      <section className="upcoming-movies">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="hero__slider slider"
        >
          {upcomingQuery.data.results.map((movie) => {
            const backdrop = getBackdropPath(movie.backdropPath);
            return (
              <SwiperSlide key={movie.id} className="slider__item">
                <div className="slider__image-wrapper">
                  <CustomImage src={backdrop} alt={movie.title} />
                </div>
                <div className="container slider__content">{movie.title}</div>
              </SwiperSlide>
            );
          })}

          <div className="slider__nav slider-nav container">
            <button
              className="btn-reset slider-nav__btn slider-nav__btn--prev"
              style={{ position: "relative", zIndex: 12 }}
              ref={navigationPrevRef}
            >
              <FaAngleLeft size={48} className="slider-nav__icon" />
            </button>
            <button
              className="btn-reset slider-nav__btn slider-nav__btn--next"
              style={{ position: "relative", zIndex: 12 }}
              ref={navigationNextRef}
            >
              <FaAngleRight size={48} className="slider-nav__icon" />
            </button>
          </div>
        </Swiper>
      </section>
    );
  }
};

export default Hero;
