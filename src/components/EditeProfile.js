import React, { useState } from "react";
import "../Style/EditeProfile.css";
import app from "./firebase";

function EditeProfile(props) {
  const name = props.location.params.name;
  const [firstName, setFirstName] = useState(name.substr(0, name.indexOf(" ")));
  const [lastName, setLastName] = useState(name.substr(name.indexOf(" ") + 1));
  const [bio, setBio] = useState(props.location.params.bio);
  const [country, setCountry] = useState(props.location.params.country);
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfrirmPassword] = useState();
  const user = props.location.params.user;

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateBio = (e) => setBio(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateNewPassword = (e) => setNewPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfrirmPassword(e.target.value);

  const cancel = () => props.history.goBack();

  const save = () => {
    app
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        bio: bio,
        firstName: firstName,
        lastName: lastName,
        country: country,
      })
      .then(() => props.history.goBack());
    if (newPassword != null) {
      if (newPassword === confirmPassword) {
        user.updatePassword(newPassword).then(() => console.log("done"));
      }
    }
  };
  return (
    <div className="editProfile">
      <h1 className="edittingTitle">Edit Your Profile</h1>
      <div className="putAside">
        <div className="leftStuff">
          <div className="inputItem">
            <h3 className="edittingTitle">First Name:</h3>
            <input
              type="text"
              placeholder="Change Name"
              className="edittingBox"
              value={firstName}
              onChange={updateFirstName}
            ></input>
          </div>
        </div>
        <div>
          <div className="inputItem">
            <h3 className="edittingTitle">Last Name:</h3>
            <input
              type="text"
              placeholder="Change Name"
              className="edittingBox"
              value={lastName}
              onChange={updateLastName}
            ></input>
          </div>
        </div>
      </div>
      <div className="inputItem">
        <h3 className="edittingTitle">Change Bio:</h3>
        <input
          type="text"
          placeholder="Change Bio"
          className="edittingBox"
          value={bio}
          onChange={updateBio}
        ></input>
      </div>
      <div className="inputItem">
        <h3 className="edittingTitle">Country:</h3>
        <input
          type="text"
          placeholder="Change Name"
          className="edittingBox"
          value={country}
          onChange={updateCountry}
        ></input>
      </div>

      <div className="putAside">
        <div className="inputItem">
          <h3 className="edittingTitle">Change Password:</h3>{" "}
          <input
            type="password"
            placeholder="New Password"
            className="edittingBox"
            onChange={updateNewPassword}
          ></input>
        </div>

        <div className="inputItem">
          <h3 className="edittingTitle">Confirm Password:</h3>{" "}
          <input
            type="password"
            placeholder="Confirm New Password"
            className="edittingBox"
            onChange={updateConfirmPassword}
          ></input>
        </div>
      </div>
      <button onClick={cancel} className="btns cancelBtn">
        Cancel
      </button>
      <button onClick={save} className="btns saveBtn">
        Save
      </button>
    </div>
  );
}

export default EditeProfile;
