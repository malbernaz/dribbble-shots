import { Component } from "preact";

import { connect } from "../../lib/unistore";
import { fetchShots } from "../../actions";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";

import s from "./style.scss";

const Item = ({ children }) =>
  <div class={s.gridItem}>
    {children}
  </div>;

const mapToProps = ({ shots }) => ({ shots: Object.keys(shots).map(s => shots[s]) });

@connect(mapToProps)
export default class ShotList extends Component {
  componentDidMount() {
    if (this.props.shots.length <= 1) {
      fetchShots();
    }
  }

  render({ shots }) {
    return (
      <div class={s.root} id="animated">
        <section class={s.grid}>
          {shots.length > 1
            ? shots.map(shot =>
                <Item key={`card-${shot.id}`}>
                  <Card shot={shot} />
                </Item>
              )
            : <Spinner />}
        </section>
      </div>
    );
  }
}
