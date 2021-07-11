// Waed ALsoufi

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postStyle from '../Style/Posts.module.css';
import app from './firebase';

function BookCard(props) {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState();
  const { publisherId, id, bookName, bookAuthor, description, alt, src } =
    props;
  const UserId = publisherId;
  useEffect(() => {
    let active = true;
    app
      .firestore()
      .collection('users')
      .doc(publisherId)
      .get()
      .then((doc) => {
        if (active) {
          setUsername(`${doc.data().firstName} ${doc.data().lastName}`);
          setAvatar(doc.data().image);
        }
      });
    return () => {
      active = false;
    };
  });

  return (
    <div className={postStyle.Bookcard} key={id}>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={{
          pathname: `/Details/${id}`,
        }}
      >
        <div className={postStyle.BookImage}>
          <img alt={`${alt} book`} src={src} />
        </div>
        <div className={postStyle.BookContent}>
          <h3 className={postStyle.BookTitle}>{bookName}</h3>
          <h5 className={postStyle.BookAuthor}>{bookAuthor}</h5>
          <p className={postStyle.BookDescription}>{description}</p>
        </div>
      </Link>
      <hr style={{ borderTop: '1px solid #440a67' }} />
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={{
          pathname: `/UserProfile/${UserId}`,
        }}
      >
        <div className={postStyle.userLabel}>
          <img
            style={{ display: 'inline' }}
            alt={username}
            src={avatar}
            className={postStyle.publisherImg}
          />
          <h3 className={postStyle.publisherName} style={{ display: 'inline' }}>
            {username}
          </h3>
        </div>
      </Link>
    </div>
  );
}
export default BookCard;
