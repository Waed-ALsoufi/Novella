import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import app from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState();
    // const [requests, setRequests] = useState([]);
    const [location, setLocation] = useState({
        longitude: "",
        latitude: "",
    });

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logOut() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    function success(pos) {
        var crd = pos.coords;
        setLocation({
            longitude: crd.longitude,
            latitude: crd.latitude,
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    useEffect(() => {
        let options = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);
    if (currentUser) {
        app
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .get()
            .then((doc) => {
                setEmail(currentUser.email);
                setBio(doc.data().bio);
                setUsername(doc.data().firstName + " " + doc.data().lastName);
                setCountry(doc.data().country);
                setAvatar(doc.data().image);
            });
    }

    const value = {
        currentUser,
        logIn,
        signUp,
        logOut,
        username,
        email,
        country,
        bio,
        avatar,
        location,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
