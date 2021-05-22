import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/LogIn.css";
import { auth } from "./firebase";

function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const submitting = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <h3 id="webName" className="text">
        Web Name
      </h3>
      <h3 id="welcome" className="text">
        Welcome back to Web Name
      </h3>
      <h1 id="bigTit" className="text">
        Log In
      </h1>
      <div className="inputItem signningItem">
        <h3 className="edittingTitle">Email:</h3>
        <input
          type="text"
          placeholder="Email"
          onChange={updateEmail}
          className="edittingBox"
        ></input>
      </div>
      <div className="inputItem signningItem">
        <h3 className="edittingTitle">Password:</h3>
        <input
          type="password"
          placeholder="Password"
          id="secondInput"
          onChange={updatePassword}
          className="edittingBox"
        ></input>
      </div>
      <div className="bottomLinks">
        <button onClick={submitting} className="button">
          Log In
        </button>
        <h5 className="h5">
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </h5>
      </div>
    </div>
  );
}
export default LogIn;
