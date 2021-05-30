// Waed ALsoufi
import { useState } from "react";
import "../Style/Tabs.css";
import { db } from "./firebase";
import BookDetail from "./BookDetails";
import UserDetails from "./UserDetails";

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
    publisherId,
    userEmail,
    uid,
  } = (props.location && props.location.props) || {};

  const [name, setName] = useState();
  const [country, setCountry] = useState();
  const [bio, setBio] = useState();
  const [image, setImage] = useState();
  const [requests, setRequests] = useState([]);

  db.collection("users")
    .doc(publisherId)
    .get()
    .then((doc) => {
      setName(`${doc.data().firstName} ${doc.data().lastName}`);
      setCountry(doc.data().country);
      setBio(doc.data().bio);
      setImage(doc.data().image);
      setRequests(doc.data().requests);
    });

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const request = () => {
    console.log("Pressed");
    if (publisherId !== uid) {
      db.collection("AllPosts")
        .doc(id)
        .update({ requested: true, requester: uid })
        .then(() => {
          setRequests((request) => [...request, { book: id, user: uid }]);
          console.log(requests);
          console.log("Done!");
        });
      // db.collection("users").doc(publisherId).update({requests:})
    } else {
      console.log("YOU CAN'T REQUEST YOUR OWN BOOK!!!!");
    }
  };

  return (
    <div className="detaills">
      {bookName ? (
        <div className="container" key={id}>
          <div className="bloc-tabs">
            <button
              className={
                toggleState === 1 ? "tabs active-tabs privBtn" : "tabs privBtn"
              }
              onClick={() => toggleTab(1)}
            >
              Book Details
            </button>
            <button
              className={
                toggleState === 2 ? "tabs active-tabs privBtn" : "tabs privBtn"
              }
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
              <BookDetail
                src={src}
                alt={alt}
                bookName={bookName}
                bookAuthor={bookAuthor}
                bookType={bookType}
                bookLocation={bookLocation}
                description={description}
                details={details}
              />
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : " content"
              }
            >
              <UserDetails
                image={image}
                name={name}
                userEmail={userEmail}
                country={country}
                bio={bio}
              />
            </div>
          </div>
        </div>
      ) : null}
      {/* <button>Cancel</button> */}
      <button className="requestBtn" onClick={request}>
        Request
      </button>
    </div>
  );
}
export default Details;
