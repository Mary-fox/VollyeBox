import React, { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Files
import './SchedulePage.scss';
import { weekRange } from './index';
import { api, apiHostName } from '../../constants/constants';

// Components
import ArrowLeft from '../../components/IconComponents/ArrowLeft';
import ArrowRight from '../../components/IconComponents/ArrowRight';
import ScheduleFilter from './ScheduleFilter/ScheduleFilter';
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
  const [week, setWeek] = useState([]); // Week filter
  const [weekFilterName, setWeekFilterName] = useState('текущая неделя'); // Week filter name
  const [shiftWeekCounter, setShiftWeekCounter] = useState(0); // Week filter

  /*** Filter week params ***/
  const [filterParams, setFilterParams] = useSearchParams();

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

    /*** Set filter week date ***/
    const weekRangeArr = weekRange(); // Current week range
    const startDate = `${weekRangeArr[0].year}-${weekRangeArr[0].month}-${weekRangeArr[0].day}`; // Current start date
    const endDate = `${weekRangeArr[6].year}-${weekRangeArr[6].month}-${weekRangeArr[6].day}`; // Current end date
    let requestParams = '';

    // Check if NOT search params - make new str. week params for request
    if (filterParams.toString() === '') {
      const filterWeekObj = {
        start_date: startDate,
        end_date: endDate,
      };

      // Сформировать строку для запроса
      requestParams = Object.entries(filterWeekObj)
        .map(([key, value]) => `${key} =${value}`)
        .join('&');

      requestParams = `?${requestParams}`;

      // Установить параметры в адресную строку
      setFilterParams(filterWeekObj);
    } else if (!(filterParams.has('start_date') && filterParams.has('end_date'))) {
      // если параметры есть, но не для недели
      // Создать новый объект с параметрами
      const newParamsObj = {};

      // Взять существующие параметры и сформировать новый объект
      for (let [key, value] of filterParams.entries()) {
        newParamsObj[key] = value;
      }

      // Добавить новые параметры недели в объект фильтра
      newParamsObj['start_date'] = startDate;
      newParamsObj['end_date'] = endDate;

      // Сформировать строку для запроса
      requestParams = Object.entries(newParamsObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      requestParams = `?${requestParams}`;

      // Установить параметры в адресную строку
      setFilterParams(newParamsObj);
    } else {
      // Если есть параметры недели и любые другие или только для недели
      // установить смещение недели
      const startDateParams = filterParams.get('start_date'); // Начало недели из параметров
      const endDateParams = filterParams.get('end_date'); // Конец недели из параметров
      const millisecondsInWeek = 24 * 60 * 60 * 1000; // Количество миллисек в дне
      const weekShift = (Date.parse(startDateParams) - Date.parse(startDate)) / millisecondsInWeek; // Разница в днях

      // Начало и конец недели для кнопки фильтра
      const newStartDateFilterName = startDateParams.split('-').slice(1).reverse().join('.');
      const newEndDateFilterName = endDateParams.split('-').slice(1).reverse().join('.');

      setShiftWeekCounter(weekShift); // Set new week shift state
      setWeekFilterName(`${newStartDateFilterName} - ${newEndDateFilterName}`); // Set filter week name

      // Создать новый объект с параметрами
      const newParamsObj = {};

      // Взять существующие параметры и сформировать новый объект
      for (let [key, value] of filterParams.entries()) {
        newParamsObj[key] = value;
      }

      // Сформировать строку для запроса
      requestParams = Object.entries(newParamsObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      requestParams = `?${requestParams}`;
    }

    // Получение всех занятий
    api.get(`klass/${requestParams}`).then(({ data }) => {
      console.log(data, 'klass data on load page');
    });

    // Check screen width for mobile
    const handleScreenChange = (event) => setIsMobScreen(event.matches);
    mobScreen.addEventListener('change', handleScreenChange);
    return () => mobScreen.removeEventListener('change', handleScreenChange);
  }, []);

  /*** Handlers ***/
  const handleChangeWeek = (changedWeekArray) => {
    let requestParams = '';

    // Start and end week for request
    const startDate = `${changedWeekArray[0].year}-${changedWeekArray[0].month}-${changedWeekArray[0].day}`;
    const endDate = `${changedWeekArray[6].year}-${changedWeekArray[6].month}-${changedWeekArray[6].day}`;

    // Start and end week for filter name
    const startWeek = `${changedWeekArray[0].day}.${changedWeekArray[0].month}`;
    const endWeek = `${changedWeekArray[6].day}.${changedWeekArray[6].month}`;

    // Создать новый объект с параметрами
    const newParamsObj = {};

    // Взять существующие параметры и сформировать новый объект
    for (let [key, value] of filterParams.entries()) {
      newParamsObj[key] = value;
    }

    // Добавить новые параметры недели в объект фильтра
    newParamsObj['start_date'] = startDate;
    newParamsObj['end_date'] = endDate;

    setFilterParams(newParamsObj);
    setWeekFilterName(`${startWeek} - ${endWeek}`);

    // Сформировать строку для запроса
    requestParams = Object.entries(newParamsObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    requestParams = `?${requestParams}`;

    // Получение всех занятий
    api.get(`klass/${requestParams}`).then(({ data }) => {
      console.log(data, 'klass data on load page');
    });
  };

  return (
    <MenuFilterContext.Provider value={{ trainers, gym, level, trainingType, filterParams, setFilterParams }}>
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
              <div
                className="filter-week__btn filter-week__btn--prev"
                onClick={() => {
                  const prevWeekRangeArr = weekRange(shiftWeekCounter - 7);

                  handleChangeWeek(prevWeekRangeArr); // Change week

                  setShiftWeekCounter((prevState) => prevState - 7); // Set new week shift state
                }}
              >
                <ArrowLeft />
              </div>

              <div className="filter-week__text">{shiftWeekCounter === 0 ? 'текущая неделя' : weekFilterName}</div>

              <div
                className="filter-week__btn filter-week__btn--next"
                onClick={() => {
                  const nextWeekRangeArr = weekRange(shiftWeekCounter + 7);

                  handleChangeWeek(nextWeekRangeArr); // Change week

                  setShiftWeekCounter((prevState) => prevState + 7); // Set new week shift state
                }}
              >
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
