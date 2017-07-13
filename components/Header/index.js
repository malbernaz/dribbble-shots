import { Link } from "preact-router";
import Match from "preact-router/match";
import Logo from "../logo";
import Arrow from "../Arrow";

import s from "./style.scss";

const Header = () =>
  <header class={s.root}>
    <Match path="/">
      {({ matches }) =>
        !matches &&
        <Link href="/">
          <Arrow class={s.backArrow} />
        </Link>}
    </Match>
    <Logo class={s.logo} />
    <h1 class={s.title}>Trippple</h1>
  </header>;

export default Header;
