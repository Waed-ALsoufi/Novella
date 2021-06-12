// Waed ALsoufi

import postStyle from "../Style/Posts.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import app from "./firebase";
function BookCard(props) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    let active = true;

    app
      .firestore()
      .collection("users")
      .doc(props.publisherId)
      .get()
      .then((doc) => {
        if (active) {
          setUsername(doc.data().firstName + " " + doc.data().lastName);
          setAvatar(doc.data().image);
        }
        // setRequests(doc.data().requests);
      });
    return () => {
      active = false;
    };
  });

  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={{
        pathname: `/Details/${props.id}`,
      }}
    >
      <div className={postStyle.Bookcard} key={props.id}>
        <div className={postStyle.BookImage}>
          <img alt={`${props.alt} book`} src={props.src} />
        </div>
        <div className={postStyle.BookContent}>
          <h3 className={postStyle.BookTitle}>{props.bookName}</h3>
          <h5 className={postStyle.BookAuthor}>{props.bookAuthor}</h5>
          <p className={postStyle.BookDescription}>{props.description}</p>
          <div className={postStyle.userLabel}>
            <img
              style={{ display: "inline" }}
              alt={username}
              src={avatar}
              className={postStyle.publisherImg}
            />
            <h3
              className={postStyle.publisherName}
              style={{ display: "inline" }}
            >
              {username}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
