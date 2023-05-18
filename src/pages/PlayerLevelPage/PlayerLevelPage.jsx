import React, { useEffect, useState } from 'react';
import { Navigation, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import 'swiper/css';
import './PlayerLevelPage.scss';
import { api, apiHostName } from '../../constants/constants';
import { changePlayerLevelHandler } from './index';
import { levelTabsSliderOptions } from './sliderOptions';

const PlayerLevelPage = () => {
  // const mobScreen = window.matchMedia('(max-width: 743px)'); // Mobile media query
  // const [isMobScreen, setIsMobScreen] = useState(mobScreen.matches); // State for mobile screen

  // General level state
  const [playerLevels, setPlayerLevels] = useState([]); // Player all levels
  const [activeLevelId, setActiveLevelId] = useState(null); // Active level id
  const [activeLevel, setActiveLevel] = useState([]); // Active level by id

  // Level tab state
  const [activeLevelInfo, setActiveLevelInfo] = useState([]); // Active level info for tabs
  const [activeLevelTabId, setActiveLevelTabId] = useState(null); // Active info tab id
  const [activeLevelTabTitle, setActiveLevelTabTitle] = useState(''); // Active info tab title
  const [activeLevelTabDescription, setActiveLevelTabDescription] = useState(''); // Active info tab description
  const [activeLevelTabVideo, setActiveLevelTabVideo] = useState(''); // Active info tab video

  // Get default level info on page load
  useEffect(() => {
    // const handleScreenChange = (event) => setIsMobScreen(event.matches);

    api.get('player-level/').then(({ data }) => {
      setPlayerLevels(data); // Set player levels list
      setActiveLevelId(data[0].id); // Set default active level id
    });

    // mobScreen.addEventListener('change', handleScreenChange);
    // return () => mobScreen.removeEventListener('change', handleScreenChange);
  }, []);

  // Change level id
  useEffect(() => {
    if (activeLevelId) {
      api.get(`player-level/${activeLevelId}/`).then(({ data }) => {
        // Create array with level info for tabs
        const levelInfo = [
          {
            id: 1,
            title: 'Прием',
            description: data.ball_pull,
            video: data.video_ball_pull,
          },
          {
            id: 2,
            title: 'Подача',
            description: data.ball_push,
            video: data.video_ball_push,
          },
          {
            id: 3,
            title: 'Передача',
            description: data.ball_pass,
            video: data.video_ball_pass,
          },
          {
            id: 4,
            title: 'Нападение',
            description: data.attack,
            video: data.video_attack,
          },
          {
            id: 5,
            title: 'Блок',
            description: data.block,
            video: data.video_block,
          },
        ];

        setActiveLevel(data); // Set general level info
        setActiveLevelInfo(levelInfo); // Set level info for tabs
        setActiveLevelTabId(levelInfo[0].id); // Set the first active tab on level change
        setActiveLevelTabDescription(levelInfo[0].description); // Set the first active tab content on level change
      });
    }
  }, [activeLevelId]);

  // Change level tabs
  useEffect(() => {
    // Filter level info after tabs change
    const activeTabInfo = activeLevelInfo.filter(({ id }) => activeLevelTabId === id);

    setActiveLevelTabTitle(activeTabInfo[0]?.title); // Set active tab title
    setActiveLevelTabDescription(activeTabInfo[0]?.description); // Set active tab description
    setActiveLevelTabVideo(activeTabInfo[0]?.video); // Set active tab video
  }, [activeLevelTabId]);

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
            <img src={`${apiHostName}${activeLevel.image}`} alt={activeLevel.title} title={activeLevel.title} />
          </div>

          {/* Скрыто по просьбе заказчика */}
          {/*<div className="player-level__preview-grade grade">*/}
          {/*  <span className="grade__total">{activeLevel.value_top}</span>*/}
          {/*  <span className="grade__range">Оценка {activeLevel.value_top} из 9</span>*/}
          {/*</div>*/}
        </div>

        <nav className="player-level__nav">
          <ul className="player-level__nav-list">
            {activeLevelInfo.map(({ id, title }) => {
              return (
                <li key={id} className={`${activeLevelTabId === id ? 'active-tab' : ''}`}>
                  <span onClick={() => setActiveLevelTabId(id)}>{title}</span>
                </li>
              );
            })}
          </ul>

          {/* странная проблема со слайдером табов - пропадает инфа табыю надо потом пофиксить */}
          {/*{isMobScreen ? (*/}
          {/*  <Swiper*/}
          {/*    className="player-level__nav-list"*/}
          {/*    modules={[Navigation]}*/}
          {/*    {...levelTabsSliderOptions}*/}
          {/*    navigation*/}
          {/*    onSlideChangeTransitionStart={({ slides }) => setActiveLevelTabId(changePlayerLevelHandler(slides))}*/}
          {/*  >*/}
          {/*    {activeLevelInfo.map(({ id, title }) => {*/}
          {/*      return (*/}
          {/*        <SwiperSlide key={id} data-level-id={id}>*/}
          {/*          <p className="level-slider__title">{title}</p>*/}
          {/*        </SwiperSlide>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </Swiper>*/}
          {/*) : (*/}
          {/*  <ul className="player-level__nav-list">*/}
          {/*    {activeLevelInfo.map(({ id, title }) => {*/}
          {/*      return (*/}
          {/*        <li key={id} className={`${activeLevelTabId === id ? 'active-tab' : ''}`}>*/}
          {/*          <span onClick={() => setActiveLevelTabId(id)}>{title}</span>*/}
          {/*        </li>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </ul>*/}
          {/*)}*/}
        </nav>

        <div className="player-level__details">
          <p className="player-level__details-title">{activeLevelTabTitle}</p>

          <div className="cke-description" dangerouslySetInnerHTML={{ __html: activeLevelTabDescription }} />
        </div>
      </section>

      {/*** Video ***/}
      <section className="level-video-section level-video">
        <div className="level-video__wrapper">
          {activeLevelTabVideo && <video src={`${apiHostName}${activeLevelTabVideo}`} autoPlay muted controls loop />}
        </div>

        <span className="level-video__title">{activeLevelTabTitle}</span>
      </section>
    </div>
  );
};

export default PlayerLevelPage;
