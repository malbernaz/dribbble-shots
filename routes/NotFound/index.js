import s from "./style.scss";

const NotFound = ({ url }) =>
  <div class={s.root}>
    <p>
      <strong>404</strong> <code>{url}</code> doesn&#39;t exist.
    </p>
  </div>;

export default NotFound;
