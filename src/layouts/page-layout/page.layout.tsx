import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../features";

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageLayout;
