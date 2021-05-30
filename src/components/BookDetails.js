import React from "react";
import "../Style/Tabs.css";

function BookDetail(props) {
  const {
    src,
    alt,
    bookName,
    bookAuthor,
    bookType,
    bookLocation,
    description,
    details,
  } = props;
  return (
    <div>
      <div className="Book_img">
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

      <div className="Book_info">
        <div className="Book_text">
          <h1>{bookName}</h1>
          <p>{description}</p>
          <h2>BOOK Details</h2>
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
