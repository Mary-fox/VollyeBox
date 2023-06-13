import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper';

// Files
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import './MainSlider.scss';
import { options } from './sliderOptions';
import { apiHostName } from '../../constants/constants';

const MainSlider = ({ slides }) => {
  return (
    <Swiper {...options} modules={[EffectCreative, Pagination, Navigation]}>
      {slides.map(({ id, image, title }) => (
        <SwiperSlide key={id}>
          <img src={`${apiHostName}${image}`} alt={title} title={title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
