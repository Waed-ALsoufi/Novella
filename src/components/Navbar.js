import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import Dropdown from "./Dropdown";
import userPic from "../Images/user.png";
import { auth } from "./firebase";

function Navbar() {
  const [navIn, setNavIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setNavIn(true);
    } else {
      setNavIn(false);
    }
  });

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);

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

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          WebSite Name
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Posts" className="nav-links">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Publish"
              className="nav-links"
              style={{ display: navIn ? "block" : "none " }}
            >
              Publish
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/SignUp"
              className="nav-links"
              style={{ display: navIn ? "none" : "block " }}
            >
              (Sign Up)
            </Link>
          </li>

          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ display: navIn ? "flex" : "none " }}
          >
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              <i className="fas fa-caret-down" />
              <img src={userPic} className="userPicNav" />{" "}
              <span className="dropDownCaret"></span>
            </Link>
            {dropdown ? <Dropdown /> : null}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
