import React, { useState } from "react";
import "../Style/Dropdown.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";

function Dropdown() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const { logOut } = useAuth();

    return (
        <>
            <ul
                onClick={handleClick}
                className={click ? "dropdown-menu clicked" : "dropdown-menu"}
            >
                <li>
                    <Link
                        className="dropdown-link"
                        to="/Profile"
                        onClick={() => setClick(false)}
                    >
                        Profile
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to="/Logout" onClick={logOut}>
                        log out
                    </Link>
                </li>
            </ul>
        </>
    );
}

export default Dropdown;
