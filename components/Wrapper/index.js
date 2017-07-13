import s from "./style.scss";

const Wrapper = ({ children }) =>
  <div class={s.root} id="animated">
    {children}
  </div>;

export default Wrapper;
