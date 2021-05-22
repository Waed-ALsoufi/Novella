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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      //   console.log(currentUser);
      setLoading(false);
    });

    return unsubscribe;
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
        setName(doc.data().firstName + " " + doc.data().lastName);
        setCountry(doc.data().country);
      });
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    name,
    email,
    country,
    bio,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}