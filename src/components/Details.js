// Waed ALsoufi
import { useState } from "react";
import "../Style/Tabs.css";
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
    userName,
    userEmail,
  } = (props.location && props.location.props) || {};

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="detaills">
      {bookName ? (
        <div className="container" key={id}>
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              Book Details
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              User Details
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
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

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <h2>{userName}</h2>
              <p>{userEmail}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Details;
