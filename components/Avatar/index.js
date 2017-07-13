import s from "./style.scss";

const Avatar = ({ src, name, smaller }) =>
  <div class={s.root} style={{ ...(smaller ? { width: "30px" } : {}) }}>
    <img src={src} alt={name} />
  </div>;

export default Avatar;
