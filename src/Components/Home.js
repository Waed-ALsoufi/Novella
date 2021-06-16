import React from 'react';
import Reviws from './Reviws';
import Quotes from './Quotes';
import '../Style/Home.css';
import Slider from './Slider';

const Home = () => (
  <div className="main">
    <Slider />
    <div>
      <Quotes />
    </div>

    <Reviws />
    {/* <button className="GoToMap" type="button">Go to map</button> */}
  </div>
);
export default Home;
