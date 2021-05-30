import React from "react";
import "../Style/Tabs.css";

function UserDetails(props) {
  const { image, name, userEmail, country, bio } = props;
  return (
    <div className="aside">
      <img alt={name} src={image} className="publisherImg" />
      <div className="userData">
        <h2 className="dataItem">{name}</h2>
        <p className="dataItem">{userEmail}</p>
        <h5 className="dataItem">{country}</h5>
        <h5 className="dataItem">{bio}</h5>
      </div>
    </div>
  );
}
export default UserDetails;
