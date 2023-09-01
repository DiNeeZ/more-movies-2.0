import { Hero, TrandingMovies, TrandingTvs } from "../../features";
import PopularPersons from "../../features/popular-persons/popular-persons";
import "./home.scss";

const Home = () => {
  return (
    <main className="main home-page">
      <Hero />
      <TrandingMovies />
      <TrandingTvs />
      <PopularPersons />
    </main>
  );
};

export default Home;
