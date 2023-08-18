import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <header>Header</header>
      <main className="main">
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};

export default PageLayout;
