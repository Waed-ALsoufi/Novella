// Waed ALsoufi
import React from "react";
import detailsStyle from "../Style/Details.module.css";
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
    <div className={detailsStyle.All} key={id}>
      <div className={detailsStyle.wrapper}>
        <div className={detailsStyle.Book_img}>
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
        <div className={detailsStyle.Book_info}>
          <div className={detailsStyle.Book_text}>
            <h1>{bookName}</h1>
            <h2>BOOK DESCRIPTION</h2>
            <p>{description}</p>
            <h2>BOOK Details</h2>
            <p>{details}</p>
            <button className={detailsStyle.Book_btn} type="button">
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
