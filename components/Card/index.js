import Link from "../Link";

import { timeago } from "../../lib/util";

import s from "./style.scss";

const Card = ({ shot }) =>
  <Link to={`/shot/${shot.id}`} class={s.root}>
    <div class={s.infoContainer}>
      <img src={shot.images.teaser} alt={shot.title} />
      <div class={s.info}>
        <div class={s.top}>
          <h2>
            {shot.title}
          </h2>
          <div class={s.description} dangerouslySetInnerHTML={{ __html: shot.description }} />
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
  </Link>;

export default Card;
