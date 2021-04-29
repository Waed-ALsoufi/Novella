// Waed ALsoufi

import "../AllStyle/Posts.css";
import React from "react";
import { Link } from "react-router-dom";

function Posts(props) {
  return (
    <div className="card" key={props.id}>
      <div className="cardImg">
        <img alt={`${props.alt} book`} src={props.src} />
      </div>
      <div className="description">
        <h4 className="cardTitle">{props.bookName}</h4>
        <p className="info">
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
          <button className="more">More Details</button>
        </Link>
      </div>
    </div>
  );
}

export default Posts;
