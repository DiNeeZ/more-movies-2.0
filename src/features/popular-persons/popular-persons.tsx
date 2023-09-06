import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigation, A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Section, PersonLink } from "../../components";
import { ColorfulSectionTitle, SliderNavButtons } from "../../components/UI";
import { getPopularPersons } from "../../api/tmdb";
import { shuffleArray } from "../../utils/helpers";
import type { Person } from "../../models/person-model";

import "./popular-persons.scss";

const PopularPersons = () => {
  const popularPersonsQuery = useQuery("popular-persons", getPopularPersons);
  const [persons, setPersons] = useState<Array<Person>>([]);

  useEffect(() => {
    if (popularPersonsQuery.isSuccess) {
      setPersons(shuffleArray<Person>(popularPersonsQuery.data.results));
    }
  }, [popularPersonsQuery.data?.results, popularPersonsQuery.isSuccess]);

  if (popularPersonsQuery.isLoading) return <h1>Loading...</h1>;

  if (popularPersonsQuery.isError) {
    if (popularPersonsQuery.error instanceof Error) {
      return <h1>{popularPersonsQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (popularPersonsQuery.isSuccess) {
    return (
      <Section className="popular-persons-section">
        <ColorfulSectionTitle>Popular Persons</ColorfulSectionTitle>
        <Swiper
          modules={[Navigation, A11y, Pagination]}
          slidesPerGroup={3}
          slidesPerView={2}
          spaceBetween={20}
          pagination={true}
          speed={600}
          breakpoints={{
            577: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              pagination: {
                enabled: false,
              },
            },
            1025: {
              slidesPerView: 6,
            },
          }}
          className="popular-persons"
        >
          <SliderNavButtons />
          {persons.map((person) => (
            <SwiperSlide key={person.id} className="popular-persons__slide">
              <PersonLink person={person} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>
    );
  }
};

export default PopularPersons;
