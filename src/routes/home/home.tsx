import { TrandingMovies, TrandingTvs } from "../../features";
import "./home.scss";

const Home = () => {
  return (
    <main className="home-page">
      <TrandingMovies />
      <TrandingTvs />
    </main>
  );
};

export default Home;
