/* eslint-disable react/no-array-index-key */
import React from 'react';
import pfp3 from '../Images/pfp3.png';
import pfp2 from '../Images/pfp2.png';
import pfp1 from '../Images/pfp1.png';

import '../Style/Reviws.css';

function Reviws() {
  const reviwsData = [
    {
      name: 'William James ',
      userImage: pfp1,
      comment: 'oh, finally I will not need to fill my shelf with books! thank you so much ',

    },
    {
      name: 'Olivia Noah',
      userImage: pfp3,
      comment: "Finally, I won't spend my money on books",

    },
    {
      name: 'Henry Jacob',
      userImage: pfp2,
      comment: 'Ooh I am very happy that I can get friends who love to read like me',

    },

  ];
  return (

    <div>
      <div className="testimonials">
        <div className="inner">
          <h1>Reviws</h1>
          <div className="border" />

          <div className="row">
            {reviwsData.map((reviw, index) => (

              <div className="col" key={index}>
                <div className="testimonial">
                  <img src={reviw.userImage} alt="" />
                  <div className="name">
                    {' '}
                    {reviw.name}
                  </div>
                  <p>{reviw.comment}</p>
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
