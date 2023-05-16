import React, { useEffect, useState } from 'react';
import { Navigation, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import 'swiper/css';
import './PlayerLevelPage.scss';
import { api } from '../../constants/constants';
import { changePlayerLevelHandler } from './index';

const PlayerLevelPage = () => {
  const [playerLevels, setPlayerLevels] = useState([]); // Player levels
  const [activeLevelId, setActiveLevelId] = useState(null); // Active level id

  // Get default level info on page load
  useEffect(() => {
    api.get('player-level/').then(({ data }) => {
      // console.log(data);
      setPlayerLevels(data); // Set player levels list
      setActiveLevelId(data[0].id); // Set default active level id
    });
  }, []);

  // Change level id
  useEffect(() => {
    if (activeLevelId) {
      api.get(`player-level/${activeLevelId}/`).then(() => {
        // console.log(+activeLevelId, 'activeLevelId');
      });
    }
  }, [activeLevelId]);

  return (
    <div className="container">
      <h1 className="page-title">уровни игроков</h1>

      {/*** Level slider ***/}
      <section className="level-slider-section">
        <Swiper
          className="level-slider"
          effect={'fade'}
          modules={[Navigation, EffectFade]}
          navigation
          onSlideChangeTransitionStart={({ slides }) => setActiveLevelId(changePlayerLevelHandler(slides))}
        >
          {playerLevels.map(({ id, title }) => {
            return (
              <SwiperSlide key={id} data-level-id={id}>
                <p className="level-slider__title">{title}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>

      {/*** Level info ***/}
      <section>active level info</section>

      {/*** Video ***/}
      <section>video</section>
    </div>
  );
};

export default PlayerLevelPage;
