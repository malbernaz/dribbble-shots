import { timeago } from "../../lib/util";

import Avatar from "../Avatar";

import s from "./style.scss";

const Comment = ({ comment }) =>
  <div class={s.root}>
    <div class={s.avatar}>
      <Avatar src={comment.user.avatar_url} name={comment.user.name} smaller />
    </div>
    <div class={s.content}>
      <h3>
        {comment.user.name}
      </h3>
      <div class={s.body} dangerouslySetInnerHTML={{ __html: comment.body }} />
      <p class={s.info}>
        about {timeago(comment.created_at)} ago
      </p>
    </div>
  </div>;

export default Comment;
