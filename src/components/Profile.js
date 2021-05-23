import React from "react";
import "../Style/Profile.css";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";

function Profile(props) {
  const { currentUser, name, email, country, bio, image } = useAuth();

  return (
    <div className="profile">
      <div className="card">
        <img src={image} className="userPic" alt="" />
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
          params: {
            user: currentUser,
            name: name,
            country: country,
            bio: bio,
            image: image,
          },
        }}
      >
        <button className="editBtn">Edit Profile</button>
      </Link>
    </div>
  );
}

export default Profile;
