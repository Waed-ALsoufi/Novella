import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import Dropdown from "./Dropdown";
import { useAuth } from "./Auth";
import { Avatar } from "@material-ui/core";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);
  const { currentUser, avatar, UserId } = useAuth();

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return currentUser ? (
    <>
      <nav className="navbar">
        <Link to="/Home" className="navbar-logo">
          <span className="title__name "> Novella</span>{" "}
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/Home" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Posts" className="nav-links">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Publish" className="nav-links">
              Publish
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to={`/UserProfile/${UserId}`}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <i className="fas fa-caret-down" />
              <img src={avatar} className="userPicNav" alt="profile" />
              <span className="dropDownCaret" />
            </Link>
            {dropdown ? <Dropdown /> : null}
          </li>
        </ul>
      </nav>
    </>
  ) : null;
}

export default Navbar;
