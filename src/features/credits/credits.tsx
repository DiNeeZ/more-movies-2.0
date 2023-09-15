import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { CustomImage, Section } from "../../components";
import { getCredits } from "../../api/tmdb";
import { CreditsPerson } from "../../models/credits-model";
import { getProfilePath } from "../../utils/helpers";

import "./credits.scss";

//Types
type MediaType = "movie" | "tv";
interface CreditsProps {
  id: string;
  mediaType: MediaType;
}
/* -------------------------------------------------------------------------------- */

//Helper functions
const sliceFirstActors = (cast: Array<CreditsPerson>, mediaType: MediaType) => {
  if (mediaType === "movie") {
    return cast.sort((a, b) => a.castId! - b.castId!).slice(0, 8);
  }

  return cast.slice(0, 8);
};
/* -------------------------------------------------------------------------------- */

//Person component
const Person = ({ person }: { person: CreditsPerson }) => {
  const srcSet = getProfilePath(person.profilePath);

  return (
    <Link to={`/person/${person.id}`} className="credits-person">
      <article className="credits-person__article">
        <CustomImage src={srcSet} alt={person.name} />
        <div className="credits-person__text">
          <h3 className="credits-person__title">{person.name}</h3>
          {person.character && (
            <p className="credits-person__character">{person.character}</p>
          )}
        </div>
      </article>
    </Link>
  );
};
/* -------------------------------------------------------------------------------- */

//Credits component
const Credits = ({ id, mediaType }: CreditsProps) => {
  const creditsQuery = useQuery(`${id}-credits`, () =>
    getCredits({ id, mediaType })
  );

  if (creditsQuery.isLoading) return <h2>Loading...</h2>;

  if (creditsQuery.isError) {
    if (creditsQuery.error instanceof Error) {
      return <h1>{creditsQuery.error.message}</h1>;
    } else {
      return <h1>Something wrong happen</h1>;
    }
  }

  if (creditsQuery.isSuccess) {
    const cast = sliceFirstActors(creditsQuery.data.cast, mediaType);
    return (
      <Section>
        <div className="credits">
          <div className="credits__item">
            <h3 className="credits__title">Director</h3>
            <div className="credits__row">
              {cast.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
            </div>
          </div>
          <div className="credits__item">
            <h3 className="credits__title">Cast</h3>
            <div className="credits__row">
              {cast.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
            </div>
          </div>
        </div>
      </Section>
    );
  }
};
/* -------------------------------------------------------------------------------- */

export default Credits;
