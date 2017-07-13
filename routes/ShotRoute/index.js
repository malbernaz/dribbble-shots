import { Component } from "preact";

import { fetchShot } from "../../actions";

import Shot from "../../components/Shot";
import NotFound from "../NotFound";

export default class ShotRoute extends Component {
  state = { component: null };

  componentDidMount() {
    this.verifyIfShotExists();
  }

  verifyIfShotExists = () => {
    const { id, url } = this.props;

    fetchShot(id).then(shot => {
      if (shot) {
        this.setState({ component: <Shot id={id} /> });
      } else {
        this.setState({ component: <NotFound url={url} /> });
      }
    });
  };

  render(props, { component }) {
    return component;
  }
}
