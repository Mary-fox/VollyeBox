import React, { useContext } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import './TopCardsPreviewSlider.scss';
import { apiHostName } from '../../constants/constants';
import { topCardsSliderOptions } from './sliderOptions';

// Context
import { SetGymIdContext } from '../../pages/GymPage/GymPage';
import { SetTrainerIdContext } from '../../pages/TrainersPage/TrainersPage';
import AngleDecorSingle from '../IconComponents/AngleDecorSingle';
import AngleDecorDouble from '../IconComponents/AngleDecorDouble';

const TopCardsPreviewSlider = ({ data }) => {
  // Use set state for gym and trainer pages
  const { setActiveGymId } = useContext(SetGymIdContext);
  const { setActiveTrainerId } = useContext(SetTrainerIdContext);

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
                  <AngleDecorDouble />
                </div>

                {/* Slide preview */}
                <div className="tcp" onClick={() => setIdHandler(id)}>
                  <div className="tcp__image">
                    <img src={`${apiHostName}${image}`} alt={name} title={name} />
                  </div>

                  <div className="tcp__content">
                    <p className="tcp__content-title">{name}</p>
                    <button className="btn btn--bg tcp__content-button">подробнее</button>
                  </div>
                </div>

                {/* Bottom decor element */}
                <div className="tcp-wrapper__bottom-decor">
                  <AngleDecorSingle />
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default TopCardsPreviewSlider;
