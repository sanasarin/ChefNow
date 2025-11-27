import { useContext } from "react";
import AccountContext from "../../contexts/AccountContext";

import { NavLink, Link, useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

function NavLinksAuth() {
  const { getInitials, account, logout } = useContext(AccountContext);
  const location = useLocation();

  const isDropdownActive = location.pathname.startsWith("/profile");

  return (
    <>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item nav-primary">
          <NavLink to={"/"} className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item nav-primary">
          <NavLink to={"/account/recipes"} className="nav-link">
            My Recipes
          </NavLink>
        </li>

        <li className="nav-item nav-primary">
          <NavLink to={"/shopping"} className="nav-link">
            Shopping List
          </NavLink>
        </li>

        <li className={`nav-item dropdown`}>
          <div
            className={`nav-link dropdown-toggle`}
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className={`${isDropdownActive && "active-custom"}`}>
              My Profile
            </span>
          </div>
          <ul className="dropdown-menu custom" aria-labelledby="navbarDropdown">
            <li>
              <Link to="/profile" className="text-decoration-none">
                <div id="nav-user-section">
                  <Avatar
                    label={account && getInitials()}
                    size="large"
                    shape="circle"
                    id="profile-pic"
                    image={account && account.profile_picture}
                  />

                  <span className="mt-2 text-capitalize">
                    {account && account.username}
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="/profile" className="dropdown-item">
                <i className="fa-regular fa-user inline-icon"></i>
                Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="dropdown-item" onClick={logout}>
                <i className="fa-solid fa-power-off inline-icon"></i>
                Log out
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item nav-primary">
          <Link to="/recipes/create" className="nav-link p-0">
            {/* <button id="create-button">
              <span className="fa-solid fa-plus"></span>
              <span>Add Recipe</span>
            </button> */}
            <Button
              raised
              icon="pi pi-plus"
              id="create-button-new"
              // className="btn-primary-c"
            />
          </Link>
        </li>
      </ul>
    </>
  );
}

export default NavLinksAuth;
