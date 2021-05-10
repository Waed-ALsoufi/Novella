import React, { useState } from "react";
import "../Style/LogIn.css";
import "../Style/EditeProfile.css";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  // const [path, setPath] = useState("/SignUp");

  const updateEmail = (e) => setEmail(e.target.value);
  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const updateBio = (e) => setBio(e.target.value);

  const submitting = (e) => {
    if (password === confirmPassword) {
      if (firstName.length < 3) {
        alert("Your first name is required");
      } else if (lastName.length < 4) {
        alert("Your last name is required");
      } else if (country.length < 4) {
        alert("Your country is required");
      } else if (password.length < 8) {
        alert("Your password must be at least 8 characters");
      } else {
        // e.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((cred) => {
            db.collection("users").doc(cred.user.uid).set({
              bio: bio,
              firstName: firstName,
              lastName: lastName,
              country: country,
            });
          })
          .then(() => props.history.push("/"));
      }
    } else {
      alert("Passwords must be identical!");
    }
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
        Sign Up
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
      <div className="putAside">
        <div className="inputItem signningItem">
          <h3 className="edittingTitle">First Name:</h3>
          <input
            type="text"
            placeholder="First Name"
            onChange={updateFirstName}
            className="creatName edittingBox"
          ></input>
        </div>
        <div className="inputItem signningItem">
          <h3 className="edittingTitle">Last Name:</h3>
          <input
            type="text"
            placeholder="Last Name"
            onChange={updateLastName}
            className="creatName edittingBox"
          ></input>
        </div>
      </div>
      <div className="inputItem signningItem">
        <h3 className="edittingTitle">Country:</h3>
        <input
          type="text"
          placeholder="Country"
          onChange={updateCountry}
          className="edittingBox"
        ></input>
      </div>
      <div className="inputItem signningItem">
        <h3 className="edittingTitle">Bio:</h3>
        <input
          type="text"
          placeholder="Your Bio!"
          onChange={updateBio}
          className="edittingBox"
        ></input>
      </div>
      <div className="putAside">
        <div className="inputItem signningItem">
          <h3 className="edittingTitle">Password:</h3>
          <input
            type="password"
            placeholder="Password"
            onChange={updatePassword}
            className="edittingBox"
          ></input>
        </div>
        <div calssName="inputItem signningItem">
          <h3 className="edittingTitle">Confirm Password:</h3>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={updateConfirmPassword}
            className="edittingBox"
          ></input>
        </div>
      </div>
      <div className="bottomLinks">
        <button onClick={submitting} className="button">
          Sign Up
        </button>
        <h5 className="h5">
          Do you already have an account? <Link to="/LogIn">Log In</Link>
        </h5>
      </div>
    </div>
  );
}
export default SignUp;
