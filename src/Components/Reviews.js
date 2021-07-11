/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import fire from './firebase';

import '../Style/Reviws.css';

function Reviws() {
  const [review, setReview] = useState(null);
  const { username, avatar } = useAuth();
  const [listReviews, setListReviews] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection('Reviews')
      .onSnapshot((docs) => {
        let temp = [];
        docs.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          temp.push(data);
        });
        setListReviews(temp.slice(-3));
      });
  }, []);

  return (
    <div>
      <div className='testimonials'>
        <div className='inner'>
          <h1>Reviews</h1>
          <div className='border' />

          <form className='btn'></form>
          <div className='flex'>
            <input
              className='urReview'
              type='text'
              placeholder='Write your review here'
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button
              className='button'
              onClick={() => {
                if (review !== null) {
                  fire.firestore().collection('Reviews').add({
                    username: username,
                    avatar: avatar,
                    review: review,
                  });
                  setReview(null);
                }
              }}
            >
              Add
            </button>
          </div>

          <div className='row'>
            {listReviews.map((review, index) => (
              <div className='col' key={index}>
                <div className='testimonial'>
                  <img src={review.avatar} alt='' />
                  <h2 className='name'> {review.username}</h2>
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviws;
