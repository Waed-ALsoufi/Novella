/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
// Waed ALsoufi
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import ReactMapGL, { Marker } from 'react-map-gl';
import detailsStyle from '../Style/Details.module.css';
import app, { db } from '../Components/firebase';
import Loading from '../Components/Loading';

import Pin from '../Components/pin';
import { useAuth } from '../Components/Auth';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

function Details(props) {
  const [books, setBooks] = useState([]);
  const [owner, setOwner] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [viewport, setViewport] = useState({
    height: ' 350px',
    width: '250px',
    zoom: 10,
  });
  const { currentUser } = useAuth();
  const consumerID = currentUser.uid;
  const bookOwner = books.publisherId;
  // eslint-disable-next-line react/destructuring-assignment
  const bookId = props.match.params.id;
  const [ifrequest, setIfRequest] = useState();
  const ownerInfo = (ownerId) => {
    app
      .firestore()
      .collection('users')
      .doc(ownerId)
      .get()
      .then((Bookowner) => {
        if (Bookowner.exists) {
          setOwner(Bookowner.data());
        } else {
          console.error('Owner undefined');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  };
  useEffect(() => {
    const bookInfo = () => {
      setisLoading(true);
      app
        .firestore()
        .collection('AllPosts')
        .doc(bookId)
        .get()
        .then((book) => {
          if (book.exists) {
            setBooks(book.data());
            // eslint-disable-next-line no-unused-expressions
            book.data().requester.includes(consumerID)
              ? setIfRequest(true)
              : setIfRequest(false);
            ownerInfo(book.data().publisherId);
            setisLoading(false);
          } else {
            console.error('No such document!');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    };
    bookInfo();
  }, [bookId, consumerID]);

  const updatePostRequest = () => {
    db.collection('AllPosts')
      .doc(bookId)
      .update({
        requester: firebase.firestore.FieldValue.arrayUnion(consumerID),
      })
      .then(() => {
        console.log('Document successfully updated!');
        setIfRequest('Requested');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };
  const updateRequestToOwner = (OwnerId) => {
    db.collection('users')
      .doc(OwnerId)
      .update({
        unapprovedExchanges: firebase.firestore.FieldValue.arrayUnion({
          consumerID,
          bookId,
        }),
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  const updateRequestToConsumer = (OwnerId) => {
    db.collection('users')
      .doc(consumerID)
      .update({
        sentExchanges: firebase.firestore.FieldValue.arrayUnion({
          OwnerId,
          bookId,
        }),
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };
  const request = () => {
    updatePostRequest();
    updateRequestToOwner(bookOwner, consumerID);
    updateRequestToConsumer(bookOwner, consumerID);
  };
  const ownerDetails = (
    <div className={detailsStyle.userLabel}>
      {consumerID !== books.publisherId ? (
        <div>
          <h4 className={detailsStyle.description}>
            You can get this book from:
          </h4>
          <img
            style={{ display: 'inline' }}
            alt={owner.owner}
            src={owner.image}
            className={detailsStyle.publisherImg}
          />
          <h3 className={detailsStyle.dataItem} style={{ display: 'inline' }}>
            {`${owner.firstName} ${owner.lastName}`}
          </h3>
          {ifrequest ? (
            <button className={detailsStyle.requestedBtn}>Requested</button>
          ) : (
            <button className={detailsStyle.requestBtn} onClick={request}>
              Request
            </button>
          )}
        </div>
      ) : (
        <div className={detailsStyle.description}>Provided by you!</div>
      )}
    </div>
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={detailsStyle.detaills}>
      <div className={detailsStyle.detaillscontainer}>
        <div className={detailsStyle.left}>
          <h2 className={detailsStyle.Title}>{books.bookName}</h2>
          <h5 className={detailsStyle.Title2}>
            By
            {books.bookAuthor}
          </h5>
          <div className={detailsStyle.BookImage}>
            <img src={books.src} alt={books.alt} />
          </div>
          <h3 className={detailsStyle.description}>Description</h3>
          <p className={detailsStyle.BookInfo}>{books.description}</p>
        </div>
        <div className={detailsStyle.right}>
          <div>
            {' '}
            <h2 className={detailsStyle.Title}> Location</h2>
            <ReactMapGL
              {...viewport}
              longitude={books.longitude}
              latitude={books.latitude}
              mapboxApiAccessToken='pk.eyJ1Ijoid2FlZGFsc291ZmkiLCJhIjoiY2twYm9lZGhyMTRhbjJ1bXBpanNicjM1byJ9.UWOw36CzRp28by_RMiKvUw'
              mapStyle='mapbox://styles/mapbox/streets-v11'
              onViewportChange={() => {
                setViewport(viewport);
              }}
            >
              <Marker
                longitude={books.longitude}
                latitude={books.latitude}
                offsetTop={-20}
                offsetLeft={-10}
              >
                <Pin size={20} />
              </Marker>
            </ReactMapGL>
            <div className={detailsStyle.userLabel}>{ownerDetails}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
