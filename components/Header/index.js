import Link from "../Link";
import Logo from "../logo";

import s from "./style.scss";

const Header = () =>
  <header class={s.root}>
    <Link to="/">
      <Logo class={s.logo} />
      <h1 class={s.title}>Trippple</h1>
    </Link>
  </header>;

export default Header;
