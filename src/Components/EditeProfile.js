/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import app from "./firebase";
import "../Style/EditeProfile.css";
import { useAuth } from "./Auth";

function EditeProfile(props) {
  const { currentUser, username, country, bio, avatar } = useAuth();

  const [newImage, setNewImage] = useState();
  const [displayedImage, setDisplayedImage] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const [firstName, setFirstName] = useState(
    username.substr(0, username.indexOf(" "))
  );
  const [lastName, setLastName] = useState(
    username.substr(username.indexOf(" ") + 1)
  );
  const [UserBio, setUserBio] = useState(bio);
  const [UserCountry, setUserCountry] = useState(country);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfrirmPassword] = useState();

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateBio = (e) => setUserBio(e.target.value);
  const updateCountry = (e) => setUserCountry(e.target.value);
  const updateNewPassword = (e) => setNewPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfrirmPassword(e.target.value);
  const updateImage = (e) => {
    setNewImage(e.target.files[0]);
    setUploadedImage(e.target.files[0]);
  };

  const uploadData = (changeImage) => {
    app
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        bio: UserBio,
        firstName,
        lastName,
        country,
        image: changeImage,
      })
      .then(() => props.history.goBack());
    if (newPassword != null) {
      if (newPassword === confirmPassword) {
        currentUser.updatePassword(newPassword).then(() => console.log("done"));
      }
    }
  };

  const uploadImage = () => {
    const uploadTask = app.storage().ref();
    uploadTask
      .child(`/users/${currentUser.uid}`)
      .put(uploadedImage)
      .then((snapshot) =>
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          if (downloadURL) {
            const changeImage = downloadURL;
            uploadData(changeImage);
          }
        })
      );
  };
  const cancel = () => props.history.goBack();

  const save = () => {
    console.log(bio);
    if (firstName.length < 3 || lastName.length < 3) {
      alert("The Name must be complete");
    } else if (country.length < 3) {
      alert("You can't delete the country");
    } else if (newPassword !== null) {
      if (newPassword.length < 8) {
        alert("password must contain at least 8 characters");
      } else if (newPassword !== confirmPassword) {
        alert("passwords must be identical");
      } else if (displayedImage) {
        uploadImage();
      } else {
        uploadData(avatar);
      }
    } else if (displayedImage) {
      uploadImage();
    } else {
      uploadData(avatar);
    }
  };

  useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = () => setDisplayedImage(reader.result);
      reader.readAsDataURL(newImage);
    } else {
      setDisplayedImage(null);
    }
  }, [newImage]);

  return (
    <div className="editProfile">
      <div className="editContainer">
        <div className="putAside">
          <div>
            <img
              alt="profile"
              src={displayedImage || avatar}
              className="editeImage"
            />
            <br />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={updateImage}
              className="setImage"
            />
            <div className="edittingBtns">
              <button onClick={save} type="button" className="btns saveBtn">
                Save
              </button>
              <button onClick={cancel} type="button" className="btns cancelBtn">
                Cancel
              </button>
            </div>
          </div>
          <div className="inputs">
            <div className="inputItem">
              <h3 className="edittingTitle">First Name:</h3>
              <input
                type="text"
                placeholder="Change Name"
                className="edittingBox"
                value={firstName}
                onChange={updateFirstName}
              />
            </div>
            <div className="inputItem">
              <h3 className="edittingTitle">Change Password:</h3>{" "}
              <input
                type="password"
                placeholder="New Password"
                className="edittingBox"
                onChange={updateNewPassword}
              />
            </div>
            <div className="inputItem">
              <h3 className="edittingTitle">Last Name:</h3>
              <input
                type="text"
                placeholder="Change Name"
                className="edittingBox"
                value={lastName}
                onChange={updateLastName}
              />
            </div>
            <div className="inputItem">
              <h3 className="edittingTitle">Confirm Password:</h3>{" "}
              <input
                type="password"
                placeholder="Confirm New Password"
                className="edittingBox"
                onChange={updateConfirmPassword}
              />
            </div>
            <div className="inputItem">
              <h3 className="edittingTitle">Change Bio:</h3>
              <input
                type="text"
                placeholder="Change Bio"
                className="edittingBox lowBox"
                value={UserBio}
                onChange={updateBio}
              />
            </div>
            <div className="inputItem">
              <h3 className="edittingTitle">Country:</h3>
              <input
                type="text"
                placeholder="Change Name"
                className="edittingBox lowBox"
                value={UserCountry}
                onChange={updateCountry}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditeProfile;
