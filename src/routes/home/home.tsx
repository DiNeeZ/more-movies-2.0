import { TrandingMovies, TrandingTvs } from "../../features";
import "./home.scss";

const Home = () => {
  return (
    <main className="main home-page">
      <TrandingMovies />
      <TrandingTvs />
    </main>
  );
};

export default Home;
