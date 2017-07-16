import "./style/main.scss";

import { options } from "preact";
import Router from "preact-router";

import Provider from "./lib/ContextProvider";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import ShotList from "./routes/ShotsList";
import ShotRoute from "./routes/ShotRoute";
import NotFound from "./routes/NotFound";

import store from "./store";

if (global.requestAnimationFrame) {
  options.debounceRendering = requestAnimationFrame;
}

const App = () =>
  <Provider context={{ store }}>
    <Wrapper>
      <Header />
      <Router>
        <ShotList path="/" />
        <ShotRoute path="/shot/:id" />
        <NotFound default />
      </Router>
    </Wrapper>
  </Provider>;

export default App;
