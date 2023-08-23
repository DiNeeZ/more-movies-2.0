import { Hero, TrandingMovies, TrandingTvs } from "../../features";
import "./home.scss";

const Home = () => {
  return (
    <main className="main home-page">
      <Hero />
      <TrandingMovies />
      <TrandingTvs />
    </main>
  );
};

export default Home;
