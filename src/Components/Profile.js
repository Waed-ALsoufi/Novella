import React from 'react';
import '../Style/Profile.css';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';

function Profile() {
  const {
    currentUser, username, email, country, bio, avatar,
  } = useAuth();

  return (
    <div className="profile">
      <div className="card">
        <img src={avatar} className="userPic" alt="" />
        <div className="area">
          <h2 className="name data">
            Name:
            {username}
          </h2>
          <h4 className="email data">
            email:
            {email}
          </h4>
          <h4 className="userName data">
            Countrty:
            {country}
          </h4>
          <h5
            style={{ display: bio ? 'block' : 'none' }}
            className="data"
            id="bio"
          >
            bio:
            {' '}
            {bio}
          </h5>
        </div>
      </div>

      <Link
        to={{
          pathname: '/EditeProfile',
          params: {
            user: currentUser,
            name: username,
            country,
            bio,
            image: avatar,
          },
        }}
      >
        <button className="editBtn" type="button">Edit Profile</button>
      </Link>
    </div>
  );
}

export default Profile;
