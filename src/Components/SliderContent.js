import React from 'react';
import '../Style/Slider.css';

function SliderContent({ activeIndex, imageSlider }) {
  return (
    <section className='SliderSection'>
      {imageSlider.map((slide, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={index === activeIndex ? 'slides active ' : 'inactive'}
        >
          <img className='sliderImage' src={slide.urls} alt='' />
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
