import React from 'react';
import '../Style/Slider.css';

function SliderContent({ activeIndex, imageSlider }) {
  return (
    <section className="SliderSection">
      {imageSlider.map((slide, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={index === activeIndex ? 'slides active ' : 'inactive'}
        >
          <img className="slide-image" src={slide.urls} alt="" />
          <h3 className="slide-title">
            {' '}
            {slide.title}
            {' '}
          </h3>
          <p className="slide-text">
            {' '}
            {slide.description}
            {' '}
          </p>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
