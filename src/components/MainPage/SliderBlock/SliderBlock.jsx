import React from 'react';
import './SliderBlock.scss';
import MainSlider from '../../MainSlider/MainSlider';



function SliderBlock ( ) {
  return (
        <div className="slider-block">
            <h1 className="slider-block__title">Галерея</h1>
            <MainSlider />
        </div>
  );
};

export default SliderBlock;