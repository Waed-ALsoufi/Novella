import React, { useState } from "react";
import "../Style/Profile.css";
import userpic from "../Images/user.png";
import { auth, db } from "./firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";

function Profile(props) {
  // console.log(user.email);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [user, setUser] = useState();
  const [doc, setDoc] = useState();

  auth.onAuthStateChanged((user) => {
    setUser(user);
    // console.log(user);
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setDoc(doc.data());
        setEmail(user.email);
        setBio(doc.data().bio);
        setName(doc.data().firstName + " " + doc.data().lastName);
        setCountry(doc.data().country);
      });
  });
  // const users = auth.currentUser;
  // console.log(`user: ${users}`);
  return (
    <div className="profile">
      <div className="card">
        <img src={userpic} className="userPic" />
        <div className="area">
          <h2 className="name data">Name: {name}</h2>
          <h4 className="email data">email: {email}</h4>
          <h4 className="userName data">Countrty: {country}</h4>
          <h5
            style={{ display: bio ? "block" : "none" }}
            className="data"
            id="bio"
          >
            bio: {bio}
          </h5>
        </div>
      </div>

      <Link
        to={{
          pathname: "/EditeProfile",
          params: { user: user, name: name, country: country, bio: bio },
        }}
      >
        <button className="editBtn">Edit Profile</button>
      </Link>
    </div>
  );
}

export default Profile;
