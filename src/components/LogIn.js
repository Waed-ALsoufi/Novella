import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginStyle from "../Style/Login.module.css";
import bg from "../Images/logBg.png";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Auth";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  let history = useHistory();
  const { login } = useAuth();

  async function submitting() {
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className={loginStyle.contact_box}>
        <div className={loginStyle.rightLogin}>
          <h2 className={loginStyle.webName}>WebName</h2>
          <h2 className={loginStyle.Title}>Welcome to WebName</h2>
          <input
            type="text"
            className={loginStyle.field}
            placeholder="Email"
            onChange={updateEmail}
          ></input>
          <input
            type="password"
            className={loginStyle.field}
            placeholder="Password"
            id="secondInput"
            onChange={updatePassword}
          ></input>

          <button className={loginStyle.btn} onClick={submitting}>
            Log In
          </button>
          <h3 className={loginStyle.Title}>
            Don't have an account?{" "}
            <Link to="/SignUp" className={loginStyle.link}>
              Sign Up
            </Link>
          </h3>
        </div>
        <div className={loginStyle.left}>
          <img src={bg} alt="" />
          <h1 id="welcome" className="text">
            “A reader lives a thousand lives before he dies.”{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
