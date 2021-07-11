import React, { useState, useEffect } from 'react';
import SliderContent from './SliderContent';
import imageSlider from './imageSlider';
import Arrow from './Arrow';
import '../Style/Slider.css';
const len = imageSlider.length - 1;
function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5300);
    return () => clearInterval(interval);
  }, [activeIndex]);
  return (
    <div className='slider-container'>
      <SliderContent activeIndex={activeIndex} imageSlider={imageSlider} />
      <Arrow
        prevSlide={() =>
          setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
        }
        nextSlide={() =>
          setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
        }
      />
    </div>
  );
}

export default Slider;
