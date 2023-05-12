import React, { useContext } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import './TopCardsPreviewSlider.scss';
import { apiHostName } from '../../constants/constants';
import { topCardsSliderOptions } from './sliderOptions';

// Context
import { SetIdContext } from '../../pages/GymPage/GymPage';

const TopCardsPreviewSlider = ({ data }) => {
  // Use set state for gym and trainer pages
  const { setActiveGymId, setActiveTrainerId } = useContext(SetIdContext);

  const setIdHandler = (id) => {
    setActiveTrainerId && setActiveTrainerId(id);
    setActiveGymId && setActiveGymId(id);
  };

  return (
    <Swiper className="tcp-slider" {...topCardsSliderOptions} modules={[Pagination]} pagination={{ clickable: true }}>
      {data.map(({ id, name, user, image, is_published = true }) => {
        // Use condition for trainers page
        if (user) {
          name = `${user.last_name} ${user.first_name}`;
          image = user.avatar;
        }

        if (is_published) {
          return (
            <SwiperSlide key={id}>
              <div className="tcp-wrapper">
                {/* Top decor element */}
                <div className="tcp-wrapper__top-decor">
                  <svg width="245" height="250" viewBox="0 0 245 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M121.59 17L8.43686 18L0 9H90.324L98.7247 0.866241L139.711 1.30107L150.871 13L154.841 28.5L222.832 95.5L235.239 95.5L244.669 106V149.5L238.217 152.5V250L228.788 238.5V126L121.59 17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Slide preview */}
                <div className="tcp">
                  <img src={`${apiHostName}${image}`} className="tcp__image" alt={name} />

                  <div className="tcp__content">
                    <p className="tcp__content-title">{name}</p>
                    <button className="btn btn--bg tcp__content-button" onClick={() => setIdHandler(id)}>
                      подробнее
                    </button>
                  </div>
                </div>

                {/* Bottom decor element */}
                <div className="tcp-wrapper__bottom-decor">
                  <svg width="89" height="182" viewBox="0 0 89 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 182L0 12L16.3774 0L16.3774 167L88.8351 167L77.9169 182H0Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          );
        } else {
          return false;
        }
      })}
    </Swiper>
  );
};

export default TopCardsPreviewSlider;
