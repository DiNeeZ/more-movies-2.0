import { useQuery } from "react-query";

import { Section } from "../../components";
import { ColorfulSectionTitle } from "../../components/UI";
import { getPopularPersons } from "../../api/tmdb";

import "./popular-persons.scss";

const PopularPersons = () => {
  const popularPersonsQuery = useQuery("popular-persons", getPopularPersons);

  if (popularPersonsQuery.isSuccess)
    return (
      <Section className="popular-persons-section">
        <ColorfulSectionTitle>Popular Persons</ColorfulSectionTitle>
        {popularPersonsQuery.data.results.map((person) => (
          <article>
            <h3>{person.name}</h3>
          </article>
        ))}
      </Section>
    );
};

export default PopularPersons;

// person/popular?api_key=${API_KEY}&language=en-US
