import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, EffectFade, Thumbs } from 'swiper';

// Files
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import './SliderThumbsBottom.scss';
import { apiHostName } from '../../constants/constants';
import { galleryTopOptions, galleryThumbsOptions } from './sliderOptions';

const SliderThumbsBottom = ({ slides }) => {
  const [thumbsBottomSwiper, setThumbsBottomSwiper] = useState(null);

  return (
    <>
      <Swiper
        {...galleryTopOptions}
        effect={'fade'}
        thumbs={{
          swiper: thumbsBottomSwiper && !thumbsBottomSwiper.destroyed ? thumbsBottomSwiper : null,
        }}
        modules={[FreeMode, Thumbs, EffectFade]}
        className="gallery-top"
      >
        {slides.map(({ id, title, image }) => {
          return (
            <SwiperSlide key={id}>
              <div className="gallery-top__image">
                <img src={`${apiHostName}${image}`} alt={title} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        {...galleryThumbsOptions}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Pagination, Thumbs]}
        onSwiper={setThumbsBottomSwiper}
        className="gallery-thumbs"
      >
        {slides.map(({ id, title, image }) => {
          return (
            <SwiperSlide key={id}>
              <div className="gallery-thumbs__image">
                <img src={`${apiHostName}${image}`} alt={title} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SliderThumbsBottom;
