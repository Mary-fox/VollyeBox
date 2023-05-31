import React, { createContext, useEffect, useState } from 'react';

// Files
import './SchedulePage.scss';
import { api, apiHostName } from '../../constants/constants';

// Components
import ScheduleFilter from './ScheduleFilter/ScheduleFilter';
import ArrowLeft from '../../components/IconComponents/ArrowLeft';
import ArrowRight from '../../components/IconComponents/ArrowRight';
import ScheduleFilterMob from './ScheduleFilterMob/ScheduleFilterMob';

// Context
export const MenuFilterContext = createContext({});

const SchedulePage = () => {
  const mobScreen = window.matchMedia('(max-width: 991px)'); // Mobile media query
  const [isMobScreen, setIsMobScreen] = useState(mobScreen.matches); // State for mobile screen

  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle info state

  // Filter states
  const [trainers, setTrainers] = useState([]); // All trainers filter state
  const [gym, setGym] = useState([]); // All gym filter state
  const [level, setLevel] = useState([]); // Training level filter state
  const [trainingType, setTrainingType] = useState([]); // Training level filter state

  // Get default page info on page load
  useEffect(() => {
    // Set page info
    api.get('dynamic-page/schedule/').then(({ data }) => {
      const pageInfo = {
        title: data.title,
        description: data.blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    // Get trainers
    api.get('trainers/').then(({ data }) => {
      setTrainers(data); // Set trainers list
      // setActiveTrainerId(data[0].id); // Set the first active trainer id
    });

    // Get gym
    api.get('gym/').then(({ data }) => {
      setGym(data); // Set gym list
      // setActiveGymId(data[0].id); // Set the first active gym id
    });

    // Get training level
    api.get('player-level/').then(({ data }) => {
      // console.log(data);
      setLevel(data); // Set training level list
    });

    // Get type training
    api.get('type-training/').then(({ data }) => setTrainingType(data)); // Set training types

    // Check screen width for mobile
    const handleScreenChange = (event) => setIsMobScreen(event.matches);
    mobScreen.addEventListener('change', handleScreenChange);
    return () => mobScreen.removeEventListener('change', handleScreenChange);
  }, []);

  return (
    <MenuFilterContext.Provider value={{ trainers, gym, level, trainingType }}>
      <div className="container">
        {/*** Page heading ***/}
        <h1 className="page-title">{pageInfo.title}</h1>

        <div className="schedule-subtitle-wrapper">
          <p className="page-subtitle">{pageInfo.description}</p>

          <div className="subtitle-level">
            {level.length > 0 &&
              level.map(({ id, title, image, is_published }) => {
                if (is_published) {
                  return (
                    <div className="subtitle-level__item" key={id}>
                      <div className="subtitle-level__item-image">
                        <img src={`${apiHostName}${image}`} alt="" />
                      </div>

                      <div className="subtitle-level__item-title">{`${title} уровень`}</div>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/*** Schedule filter ***/}
        <section className="schedule">
          <div className="schedule__filter">
            {isMobScreen ? <ScheduleFilterMob /> : <ScheduleFilter />}

            {/* Week filter */}
            <div className="filter-week">
              <div className="filter-week__btn filter-week__btn--prev" onClick={() => console.log('prev week')}>
                <ArrowLeft />
              </div>

              <div className="filter-week__text">текущая неделя</div>

              <div className="filter-week__btn filter-week__btn--next" onClick={() => console.log('next week')}>
                <ArrowRight />
              </div>
            </div>
          </div>

          {/*** Schedule content ***/}
          <div className="schedule__body">schedule body</div>
        </section>
      </div>
    </MenuFilterContext.Provider>
  );
};

export default SchedulePage;
