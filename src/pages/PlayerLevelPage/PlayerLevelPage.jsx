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
      api.get(`player-level/${activeLevelId}/`).then(({ data }) => {
        // console.log(data, 'data');
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
      <section className="level-info-section player-level">
        <div className="player-level__preview">
          <div className="player-level__preview-image">
            <img
              src="https://merlinsbeard.ru//media/filer_public/b2/53/b253323f-06c7-4eab-8a44-13431c220a5b/1660191934_2-sportishka-com-p-trenirovka-voleibol-devushki-sport-krasivo-2.jpg"
              alt="image"
            />
          </div>

          <div className="player-level__preview-grade grade">
            <span className="grade__total">3</span>
            <span className="grade__range">Оценка 3 из 9</span>
          </div>
        </div>

        <nav className="player-level__nav">
          <ul>
            <li>Прием</li>
            <li>Подача</li>
            <li>Передача</li>
            <li>Нападение</li>
            <li>Блок</li>
          </ul>
        </nav>

        <div className="player-level__details">
          <p className="player-level__details-title">Подача</p>
          <p className="player-level__details-subtitle">Частые ошибки</p>

          <ul className="details-list">
            <li className="details-list__item">
              <p className="details-list__item-text">- неправильный разбег</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- не попадание руками по мячу</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- не попадание руками по мячу</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- не попадание в площадку</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- касание сетки</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- неправильный выход под мяч</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- низкий прыжок</p>
            </li>
            <li className="details-list__item">
              <p className="details-list__item-text">- прыжок вперед</p>
            </li>
          </ul>
        </div>
      </section>

      {/*** Video ***/}
      <section className="level-video-section level-video">
        <div className="level-video__wrapper">
          <iframe
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/7qnrPk0cFs8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <span className="level-video__title">Подача</span>
      </section>
    </div>
  );
};

export default PlayerLevelPage;
