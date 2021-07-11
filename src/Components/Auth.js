import React, { useContext, useState, useEffect } from 'react';
import app, { auth } from './firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState();
  const [UserId, setUserId] = useState('');
  const [location, setLocation] = useState({
    longitude: 34.25,
    latitude: 32.0,
  });

  function signUp(Email, password) {
    return auth.createUserWithEmailAndPassword(Email, password);
  }

  function logIn(Email, password) {
    return auth.signInWithEmailAndPassword(Email, password);
  }
  function logOut() {
    return auth.signOut();
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  function success(pos) {
    const crd = pos.coords;
    setLocation({
      longitude: crd.longitude,
      latitude: crd.latitude,
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  if (currentUser) {
    app
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setEmail(currentUser.email);
        setBio(doc.data().bio || '');
        setUsername(`${doc.data().firstName} ${doc.data().lastName}`);
        setCountry(doc.data().country);
        setAvatar(doc.data().image);
        setUserId(currentUser.uid);
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
    UserId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
