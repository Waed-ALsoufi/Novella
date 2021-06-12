import React, { useState } from "react";
import loginStyle from "../Style/Login.module.css";
import fire from "./firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import bg from "../Images/logBg.png";
import { useAuth } from "./Auth";

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState("");
    let history = useHistory();
    const { signUp } = useAuth();

    const updateEmail = (e) => setEmail(e.target.value);
    const updateFirstName = (e) => setFirstName(e.target.value);
    const updateLastName = (e) => setLastName(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const updateBio = (e) => setBio(e.target.value);

    async function submitting() {
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
                try {
                    await signUp(email, password).then((cred) => {
                        fire.firestore().collection("users").doc(cred.user.uid).set({
                            bio: bio,
                            firstName: firstName,
                            lastName: lastName,
                            country: country,
                            image:
                                "https://scontent.fgza9-1.fna.fbcdn.net/v/t1.15752-9/94199444_2475066079399209_8734392282242875392_n.png?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=OyzjNBicZSEAX-9MYE7&_nc_ht=scontent.fgza9-1.fna&oh=3e9ccf54d67ab156f2f4c8e3d082f7e3&oe=60D23EB9",
                            sentExchanges: [],
                            unapprovedExchanges: [],
                        });
                    });
                    history.push("/");
                } catch (err) {
                    alert(err.message);
                }
            }
        } else {
            alert("Passwords must be identical!");
        }
    }
    return (
        <div className={loginStyle.contact_box}>
            <div className={loginStyle.rightSignup}>
                <h2 className={loginStyle.webName}>WebName</h2>
                <h2 className={loginStyle.Title}>Welcome to WebName</h2>
                <div className={loginStyle.onlyOne}>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={updateEmail}
                        className={loginStyle.field}
                    ></input>
                </div>

                <input
                    type="text"
                    placeholder="First Name"
                    onChange={updateFirstName}
                    className={loginStyle.field2}
                ></input>
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={updateLastName}
                    className={loginStyle.field2}
                ></input>
                <div className={loginStyle.onlyOne}>
                    <input
                        type="text"
                        placeholder="Country"
                        onChange={updateCountry}
                        className={loginStyle.field}
                    ></input>
                </div>
                <div className={loginStyle.onlyOne}>
                    <input
                        type="text"
                        placeholder="Your Bio!"
                        onChange={updateBio}
                        className={loginStyle.field}
                    ></input>
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={updatePassword}
                    className={loginStyle.field2}
                ></input>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={updateConfirmPassword}
                    className={loginStyle.field2}
                ></input>
                <button onClick={submitting} className={loginStyle.btn}>
                    Sign Up
                </button>
                <h3 className={loginStyle.Title}>
                    Do you already have an account?
                    <Link to="/Login" className={loginStyle.link}>
                        Login
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
    );
}
export default SignUp;
