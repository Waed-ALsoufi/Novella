import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import Dropdown from "./Dropdown";

function Navbar() {
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
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
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
              User Name <i className="fas fa-caret-down" />
            </Link>
            {dropdown ? <Dropdown /> : null}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
