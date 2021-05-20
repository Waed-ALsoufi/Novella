import React, { useState } from "react";
import "../AllStyle/EditeProfile.css";
import { auth } from "./firebase";

function EditeProfile(params) {
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const user = props.params.location.user;
  console.log(user);

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const cancel = () => props.history.goBack();
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
        ></input>
      </div>
      <div className="inputItem">
        <h3 className="edittingTitle">Country:</h3>
        <input
          type="text"
          placeholder="Change Name"
          className="edittingBox"
        ></input>
      </div>

      <div className="putAside">
        <div className="inputItem">
          <h3 className="edittingTitle">Change Password:</h3>{" "}
          <input
            type="text"
            placeholder="New Password"
            className="edittingBox"
          ></input>
        </div>

        <div className="inputItem">
          <h3 className="edittingTitle">Confirm Password:</h3>{" "}
          <input
            type="text"
            placeholder="Confirm New Password"
            className="edittingBox"
          ></input>
        </div>
      </div>
      <button onClick={cancel} className="btns cancelBtn">
        Cancel
      </button>
      <button className="btns saveBtn">Save</button>
    </div>
  );
}

export default EditeProfile;
