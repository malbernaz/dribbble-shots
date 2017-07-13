import { Component } from "preact";

import { connect } from "../../lib/unistore";
import { fetchShots } from "../../actions";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";

import s from "./style.scss";

const mapToProps = ({ shots, loadingShots, page }) => ({
  shots: Object.keys(shots).map(s => shots[s]),
  page: parseInt(page, 10),
  loadingShots
});

@connect(mapToProps)
export default class ShotList extends Component {
  componentDidMount() {
    if (this.props.shots.length <= 1) {
      fetchShots(this.props.page || 1);
    }
  }

  loadmore = () => {
    const { loadingShots, page } = this.props;
    if (loadingShots) return;
    fetchShots(page + 1);
  };

  render({ shots, loadingShots }) {
    return (
      <div class={s.root} id="animated">
        {shots.length > 1
          ? <div class={s.grid}>
              {shots.map(shot =>
                <div key={`griditem-${shot.id}`} class={s.gridItem}>
                  <Card shot={shot} />
                </div>
              )}
            </div>
          : <Spinner />}
        {shots.length
          ? <button class={s.loadmore} onClick={this.loadmore}>
              {!loadingShots ? <span>load more</span> : <Spinner />}
            </button>
          : null}
      </div>
    );
  }
}
