import { options } from "preact";

import Router from "universal-router";
import TransitionGroup from "preact-transition-group";

import history, { storeScroll, restoreScroll } from "./lib/history";
import animated from "./lib/animated";
import AsyncComponent from "./lib/AsyncComponent";
import Provider from "./lib/ContextProvider";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import ShotList from "./routes/ShotsList";
import Shot from "./routes/Shot";
import NotFound from "./routes/NotFound";

import store from "./store";
import { fetchShot } from "./actions";

import "./style/main.scss";

options.debounceRendering = requestAnimationFrame;

const routes = {
  path: "/",
  action({ next }) {
    storeScroll(history);
    return next().then(component => {
      return (
        <Wrapper>
          <Header />
          {component}
        </Wrapper>
      );
    });
  },
  children: [
    {
      path: "/",
      action({ url }) {
        return <ShotList key={url} />;
      }
    },
    {
      path: "/shot/:id",
      action({ url }, { id }) {
        if (store.getState().shots[id]) {
          return <Shot key={url} id={id} />;
        }
        return fetchShot(id)
          .then(() => {
            return <Shot key={url} id={id} />;
          })
          .catch(() => {
            return <NotFound key={url} />;
          });
      }
    },
    {
      path: "*",
      action({ url }) {
        return <NotFound key={url} />;
      }
    }
  ]
};

export default class App extends AsyncComponent {
  state = { location: history.location };
  router = new Router(routes);
  componentDidMount() {
    history.listen(this.changeRoute);
  }
  changeRoute = location => {
    this.setState({ location });
  };
  render(props, { location }) {
    return this.router.resolve(location.pathname).then(component => {
      const AnimatedRoute = animated(() => component);
      return (
        <Provider context={{ store }}>
          <TransitionGroup component="div" class="route-transition-container">
            <AnimatedRoute
              timeout={600}
              onTransitionEnd={() => restoreScroll(history.location)}
              key={location.pathname}
            />
          </TransitionGroup>
        </Provider>
      );
    });
  }
}
