import { Component } from "preact";

import { connect } from "../../lib/unistore";
import { formatDate, pluralize, filter, map } from "../../lib/util";
import { fetchComments } from "../../actions";

import Avatar from "../../components/Avatar";
import Spinner from "../../components/Spinner";
import Comment from "../../components/Comment";
import Like from "../../components/Like";

import s from "./style.scss";

const mapToProps = ({ shots }, { id }) => ({
  shot: filter(shots, s => s.id == id)[0]
});

@connect(mapToProps)
export default class Shot extends Component {
  state = { imgSrc: null, hasError: false };

  componentDidMount() {
    if (this.props.shot && !this.props.shot.comments) {
      fetchComments(this.props.shot.id).catch(() => {
        this.setState({ hasError: true });
      });
    }
    this.loadImg();
  }

  loadImg = () => {
    const img = new Image();

    img.onload = ({ target }) => {
      this.setState({ imgSrc: target.src });
    };

    const { shot } = this.props;

    img.src = shot.images.hidpi || shot.images.normal;
  };

  render({ shot }, { imgSrc, hasError }) {
    return (
      <div class={s.root} id="animated">
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
              <img src={imgSrc || shot.images.teaser} alt={shot.title} />
            </div>
            <div
              class={s.description}
              dangerouslySetInnerHTML={{ __html: shot.description }}
            />
            {shot.comments_count
              ? <div class={s.comments}>
                  <div class={s.commentsCount}>
                    <p>
                      {pluralize(shot.comments_count, " Comment")}
                    </p>
                  </div>
                  {shot.comments && shot.comments.length
                    ? map(shot.comments, c =>
                        <Comment key={c.id} comment={c} />
                      )
                    : !hasError ? <Spinner /> : null}
                  {hasError &&
                    <span class={s.error}>
                      something went wrong... could not load comments. : (
                    </span>}
                </div>
              : null}
          </div>
        </div>
      </div>
    );
  }
}
