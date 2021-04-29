// Waed ALsoufi
import React from "react";
import "../Style/Details.css";
function Details(props) {
  const {
    bookName,
    bookAuthor,
    bookType,
    bookLocation,
    description,
    id,
    alt,
    src,
    details,
  } = (props.location && props.location.props) || {};
  console.log(props);
  return (
    <div className="All" key={id}>
      <div className="wrapper">
        <div className="Book-img">
          <img src={src} alt={alt} />
          <ul>
            <li>
              <span>Book Name : </span> {bookName}
            </li>
            <li>
              <span>By :</span> {bookAuthor}
            </li>
            <li>
              <span>Type :</span> {bookType}
            </li>
            <li>
              <span>Location :</span> {bookLocation}
            </li>
          </ul>
        </div>
        <div className="Book-info">
          <div className="Book-text">
            <h1>{bookName}</h1>
            <h2>BOOK DESCRIPTION</h2>
            <p>{description}</p>
            <h2>BOOK Details</h2>
            <p>{details}</p>
            <button className="Book-btn" type="button">
              {" "}
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
