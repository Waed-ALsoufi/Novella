import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import Dropdown from "./Dropdown";
import { useAuth } from "./Auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);
  const { currentUser, image } = useAuth();

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
          WebSite Name
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
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              <i className="fas fa-caret-down" />
              <img src={image} className="userPicNav" alt="profile" />
              <span className="dropDownCaret"></span>{" "}
            </Link>
            {dropdown ? <Dropdown /> : null}
          </li>
        </ul>
      </nav>
    </>
  ) : null;
}

export default Navbar;
