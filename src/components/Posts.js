// Waed ALsoufi

import postStyle from "../Style/Posts.module.css";
import React from "react";
import { Link } from "react-router-dom";

function Posts(props) {
  return (
    <div className={postStyle.card} key={props.id}>
      <div className={postStyle.cardImg}>
        <img alt={`${props.alt} book`} src={props.src} />
      </div>
      <div className={postStyle.description}>
        <h4 className={postStyle.cardTitle}>{props.bookName}</h4>
        <p className={postStyle.info}>
          {" "}
          <small> Book Author :{props.bookAuthor}</small>
        </p>
        <p>
          <small>Book Type :{props.bookType}</small>
        </p>
        <p>
          <small>Book Location :{props.bookLocation}</small>
        </p>

        <Link
          to={{
            pathname: "/Details",
            props,
          }}
          className="infobtn"
        >
          <button className={postStyle.more}>More Details</button>
        </Link>
      </div>
    </div>
  );
}

export default Posts;
