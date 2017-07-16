import { Component } from "preact";
import Portal from "preact-portal";

import Shot from "../Shot";
import Arrow from "../Arrow";

import { timeago } from "../../lib/util";

import s from "./style.scss";

export default class Card extends Component {
  state = { open: false };
  openModal = e => {
    e.stopPropagation();
    e.preventDefault();
    document.body.style.overflowY = "hidden";
    history.pushState(null, null, `/shot/${this.props.shot.id}`);
    this.setState({ open: true });
  };

  hideModal = () => {
    document.body.style.overflowY = "";
    history.pushState(null, null, "/");
    this.setState({ open: false });
  };

  render({ shot }, { open }) {
    return (
      <a href={`/shot/${shot.id}`} onClick={this.openModal} class={s.root}>
        <div class={s.infoContainer}>
          <img src={shot.images.teaser} alt={shot.title} />
          <div class={s.info}>
            <div class={s.top}>
              <h2>
                {shot.title}
              </h2>
              <div
                class={s.description}
                dangerouslySetInnerHTML={{ __html: shot.description }}
              />
            </div>
            <div class={s.bottom}>
              about {timeago(shot.created_at)} ago
            </div>
          </div>
        </div>
        <div class={s.stats}>
          <span class={s.reply} />
          <span class={s.atachmments} />
          <span class={s.views}>
            {shot.views_count}
          </span>
          <span class={s.comments}>
            {shot.comments_count}
          </span>
          <span class={s.likes}>
            {shot.likes_count}
          </span>
        </div>

        {open
          ? <Portal into="body">
              <div class={s.modalShadow} onClick={this.hideModal}>
                <div class={s.modalContent} onClick={e => e.stopPropagation()}>
                  <div class={s.modalHeader}>
                    <a onClick={this.hideModal}>
                      <Arrow class={s.closeBtn} />
                    </a>
                  </div>
                  <Shot id={shot.id} />
                </div>
              </div>
            </Portal>
          : null}
      </a>
    );
  }
}
