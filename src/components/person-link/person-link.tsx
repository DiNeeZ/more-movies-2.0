import { Link } from "react-router-dom";

import { CustomImage } from "..";
import { getProfilePath } from "../../utils/helpers";
import type { Person } from "../../models/person-model";

import "./person-link.scss";

const PersonLink = ({ person }: { person: Person }) => {
  const srcSet = getProfilePath(person.profilePath);

  return (
    <Link to={`person/${person.id}`} className="person-link">
      <article className="person-link__card">
        <h3 className="person-link__title">{person.name}</h3>
        <CustomImage src={srcSet} alt={person.name} />
      </article>
    </Link>
  );
};

export default PersonLink;
