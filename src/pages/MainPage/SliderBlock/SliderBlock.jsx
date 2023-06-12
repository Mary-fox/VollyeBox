import React from 'react';
import './SliderBlock.scss';
import MainSlider from '../../../components/MainSlider/MainSlider';

function SliderBlock({ data }) {
  return (
    <div className="slider-block">
      <h1 className="slider-block__title">Галерея</h1>
      <MainSlider data={data} />
    </div>
  );
}

export default SliderBlock;
