import React, { useState, useEffect } from "react";
import fire from "./firebase";
import app from "./firebase";
import "../Style/EditeProfile.css";

function EditeProfile(props) {
    const user = props.location.params.user;
    const name = props.location.params.name;

    const image = props.location.params.image;
    const [newImage, setNewImage] = useState();
    const [displayedImage, setDisplayedImage] = useState();
    const [uploadedImage, setUploadedImage] = useState();

    const [firstName, setFirstName] = useState(name.substr(0, name.indexOf(" ")));
    const [lastName, setLastName] = useState(name.substr(name.indexOf(" ") + 1));
    const [bio, setBio] = useState(props.location.params.bio);
    const [country, setCountry] = useState(props.location.params.country);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfrirmPassword] = useState();

    const updateFirstName = (e) => setFirstName(e.target.value);
    const updateLastName = (e) => setLastName(e.target.value);
    const updateBio = (e) => setBio(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
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
            .doc(user.uid)
            .set({
                bio: bio,
                firstName: firstName,
                lastName: lastName,
                country: country,
                image: changeImage,
            })
            .then(() => props.history.goBack());
        if (newPassword != null) {
            if (newPassword === confirmPassword) {
                user.updatePassword(newPassword).then(() => console.log("done"));
            }
        }
    };

    const uploadImage = () => {
        const uploadTask = fire.storage().ref();
        uploadTask
            .child(`/users/${user.uid}`)
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
        if (firstName.length < 3 || lastName.length < 3) {
            alert("The Name must be complete");
        } else {
            if (country.length < 3) {
                alert("You can't delete the country");
            } else {
                if (newPassword !== null) {
                    if (newPassword.length < 8) {
                        alert("password must contain at least 8 characters");
                    } else {
                        if (newPassword !== confirmPassword) {
                            alert("passwords must be identical");
                        } else {
                            if (displayedImage) {
                                uploadImage();
                            } else {
                                uploadData(image);
                            }
                        }
                    }
                } else {
                    if (displayedImage) {
                        uploadImage();
                    } else {
                        uploadData(image);
                    }
                }
            }
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
            <h1 className="edittingTitle">Edit Your Profile</h1>
            <img
                alt="profile"
                src={displayedImage ? displayedImage : image}
                className="editeImage"
            />
            <br />
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={updateImage}
                className="setImage"
            ></input>
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
