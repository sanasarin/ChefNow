import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavLinksNoAuth() {
  return (
    <>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item nav-primary">
          <NavLink to={"/"} className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item nav-primary">
          <NavLink to={"/login"} className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item nav-primary">
          <NavLink to={"/register"} className="nav-link">
            Register
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default NavLinksNoAuth;
