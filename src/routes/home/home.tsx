import { TrandingMovies, TrandingTvs } from "../../features";
import "./home.scss";

const Home = () => {
  return (
    <>
      <TrandingMovies />
      <TrandingTvs />
    </>
  );
};

export default Home;
