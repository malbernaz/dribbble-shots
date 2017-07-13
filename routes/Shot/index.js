import { Component } from "preact";

import { connect } from "../../lib/unistore";
import { formatDate, pluralize } from "../../lib/util";
import { fetchComments } from "../../actions";

import Avatar from "../../components/Avatar";
import Spinner from "../../components/Spinner";
import Comment from "../../components/Comment";
import Like from "../../components/Like";

import s from "./style.scss";

const mapToProps = ({ shots }, { id }) => ({ shot: shots[id] });

@connect(mapToProps)
export default class Shot extends Component {
  componentDidMount() {
    if (this.props.shot && !this.props.shot.comments) {
      fetchComments(this.props.shot.id);
    }
  }

  render({ shot }) {
    return shot
      ? <div class={s.root} id="animated">
          <header class={s.header}>
            <div class={s.headerLeft}>
              <Avatar src={shot.user.avatar_url} name={shot.user.name} />
              <div class={s.headerInfo}>
                <h1>
                  {shot.title}
                </h1>
                <p>
                  by {shot.user.name} on {formatDate(shot.created_at)}
                </p>
              </div>
            </div>
            <div class={s.headerRight}>
              <div class={s.likesCount}>
                <Like class={s.like} /> {shot.likes_count}
              </div>
            </div>
          </header>
          <div class={s.body}>
            <div class={s.content}>
              <div class={s.shot}>
                <img src={shot.images.hidpi || shot.images.normal} alt={shot.title} />
              </div>
              <div class={s.description} dangerouslySetInnerHTML={{ __html: shot.description }} />
              {shot.comments_count &&
                <div class={s.comments}>
                  <div class={s.commentsCount}>
                    <p>
                      {pluralize(shot.comments_count, " Comment")}
                    </p>
                  </div>
                  {shot.comments && shot.comments.length
                    ? shot.comments.map(c => <Comment key={c.id} comment={c} />)
                    : <Spinner />}
                </div>}
            </div>
          </div>
        </div>
      : null;
  }
}
