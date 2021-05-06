import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import Dropdown from "./Dropdown";
import userPic from "../Images/user.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
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
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Posts" className="nav-links" onClick={closeMobileMenu}>
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Publish" className="nav-links" onClick={closeMobileMenu}>
              Publish
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/SignUp" className="nav-links" onClick={closeMobileMenu}>
              (Sign Up)
            </Link>
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              <i className="fas fa-caret-down" />
              <img src={userPic} className="userPicNav" />{" "}
              <span className="dropDownCaret"></span>
            </Link>
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
