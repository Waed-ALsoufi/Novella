import React from 'react';
import Reviews from '../Components/Reviews';
import Quotes from '../Components/Quotes';
import '../Style/Home.css';
import Slider from '../Components/Slider';

const HomePage = () => (
  <div className='main'>
    <Slider />
    <div>
      <Quotes />
    </div>
    <Reviews />
  </div>
);
export default HomePage;
