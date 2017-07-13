import "./style/main.scss";

import { options } from "preact";
import Router from "preact-router";

import Provider from "./lib/ContextProvider";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import ShotList from "./routes/ShotsList";
import Shot from "./routes/Shot";
import NotFound from "./routes/NotFound";

import store from "./store";

options.debounceRendering = requestAnimationFrame;

const App = () =>
  <Provider context={{ store }}>
    <Wrapper>
      <Header />
      <Router onChange={() => scrollTo(0, 0)}>
        <ShotList path="/" />
        <Shot path="/shot/:id" />
        <NotFound default />
      </Router>
    </Wrapper>
  </Provider>;

export default App;
