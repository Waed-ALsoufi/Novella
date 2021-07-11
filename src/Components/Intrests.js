import React, { useState } from 'react';
import '../Style/Intrests.css';
// import pfp3 from '../Images/pfp3.png';
import pfp2 from '../Images/pfp2.png';
// import pfp1 from '../Images/pfp1.png';
import { Checkbox } from '@material-ui/core';
import { useAuth } from './Auth';
import fire from './firebase';

function Intrests() {
  const { currentUser } = useAuth();
  const [intrestsData, setIntrestData] = useState([
    {
      name: 'Social Books',
      intrImg: pfp2,
      check: false,
    },
    {
      name: 'Fantasy',
      intrImg: pfp2,
      check: false,
    },
    {
      name: 'Romantic',
      intrImg: pfp2,
      check: false,
    },
    {
      name: 'Horror',
      intrImg: pfp2,
      check: false,
    },
    {
      name: 'Motivational',
      intrImg: pfp2,
      check: false,
    },
    {
      name: 'Children',
      intrImg: pfp2,
      check: false,
    },
  ]);
  return (
    <div className='testimonials'>
      <h1 className='tellUs'>Tell us about your interests? </h1>

      <br />
      <br />
      <br />
      <div className='row'>
        {intrestsData.map((intrest, index) => (
          <div className='col' key={index}>
            <div className='itrImg'>
              <img src={intrest.intrImg} alt='' />
              <Checkbox
                className='checkbox'
                checked={intrest.check}
                onChange={() => {
                  const newIntrest = intrestsData.filter(
                    (last) => last.name !== intrest.name
                  );
                  newIntrest.push({
                    name: intrest.name,
                    check: !intrest.check,
                    intrImg: intrest.intrImg,
                  });
                  setIntrestData(newIntrest);
                }}
              />
              <br />
              <div className='intrname'> {intrest.name}</div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <div>
        <button
          className='next'
          onClick={() => {
            const newIntrest = intrestsData.filter(
              (last) => last.name === true
            );
            setIntrestData(newIntrest);
            fire
              .firestore()
              .collection('users')
              .doc(currentUser.uid)
              .update({ intrestsData });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Intrests;
