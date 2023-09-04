import { Routes, Route } from "react-router-dom";

import { Home, Details, Person } from "./routes";
import { PageLayout, ScrollToTop } from "./components";

import "./styles/global.scss";

const App = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            path="*"
            element={<p style={{ flexGrow: 1 }}>No content!</p>}
          />
          <Route index element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/person/:id" element={<Person />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

export default App;
