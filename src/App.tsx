import { Routes, Route } from "react-router-dom";

import { Home, Details } from "./routes";
import { PageLayout, ScrollToTop } from "./components";

import "./styles/global.scss";

const App = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="*" element={<p>Нихуя нима</p>} />
          <Route index element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default App;
