import { useContext } from "react";
import AccountContext from "../../contexts/AccountContext";
import NavLinksNoAuth from "./NavLinksNoAuth";
import NavLinksAuth from "./NavLinksAuth";

function NavLinks() {
  const { isAuth } = useContext(AccountContext);

  if (!isAuth) {
    return <NavLinksNoAuth />;
  } else {
    return <NavLinksAuth />;
  }
}

export default NavLinks;
