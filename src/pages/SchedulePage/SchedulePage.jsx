import React, { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert } from '@mui/material';

// Files
import './SchedulePage.scss';
import { weekRange } from './index';
import { api, apiHostName } from '../../constants/constants';
import { config } from '../Account/EditProfilePopup';

// Components
import ArrowLeft from '../../components/IconComponents/ArrowLeft';
import ArrowRight from '../../components/IconComponents/ArrowRight';
import ScheduleFilter from './ScheduleFilter/ScheduleFilter';
import ScheduleFilterMob from './ScheduleFilterMob/ScheduleFilterMob';
import Metro from '../../components/IconComponents/Metro';
import ScheduleClass from './ScheduleClass/ScheduleClass';

// Context
export const MenuFilterContext = createContext({});
export const ClassContext = createContext({});

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
  const [week, setWeek] = useState([]); // Week data
  const [weekFilterName, setWeekFilterName] = useState('текущая неделя'); // Week filter name
  const [shiftWeekCounter, setShiftWeekCounter] = useState(0); // Week shift

  const [scheduleInfo, setScheduleInfo] = useState([]); // расписние всех занятий
  const [noClassMsg, setNoClassMsg] = useState(''); // No class message
  const [joinClassAlert, setJoinClassAlert] = useState(''); // Ошибка при записи на занятие

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

    // Get user id and name
    if (!localStorage.getItem('user') && localStorage.getItem('access_token')) {
      api.get('get_my_id/', config).then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
      });
    }

    // Get trainers and set trainers list
    api.get('trainers/').then(({ data }) => setTrainers(data));

    // Get gym and set gym list
    api.get('gym/').then(({ data }) => setGym(data));

    // Get training level and set training level list
    api.get('player-level/').then(({ data }) => setLevel(data));

    // Get type training and set training types list
    api.get('type-training/').then(({ data }) => setTrainingType(data));

    /*** Set filter week date ***/
    const weekRangeArr = weekRange(); // Current week range
    const startDate = `${weekRangeArr[0].year}-${weekRangeArr[0].month}-${weekRangeArr[0].day}`; // Current start date
    const endDate = `${weekRangeArr[6].year}-${weekRangeArr[6].month}-${+weekRangeArr[6].day + 1}`; // Current end date

    setWeek(weekRangeArr); // Set current week data

    // Check if NOT search params - make new str. week params for request
    if (filterParams.toString() === '') {
      const filterWeekObj = {
        start_date: startDate,
        end_date: endDate,
      };

      // Сформировать строку для запроса
      const requestParams = Object.entries(filterWeekObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      setFilterParams(filterWeekObj); // Установить параметры в адресную строку

      // Получение всех занятий
      api.get(`klass/?${requestParams}`).then(({ data }) => {
        data.length === 0 ? setNoClassMsg('Занятий нет') : setNoClassMsg('');

        const scheduleDataObj = {}; // create new schedule obj

        data.forEach((item) => {
          let itemWeekDayIndex = new Date(item.date).getDay(); // получение индекса расположения занятия в неделе
          itemWeekDayIndex === 0 ? (itemWeekDayIndex = 6) : itemWeekDayIndex--; // его позиция в массиве занятий

          if (!scheduleDataObj[item.gym]) {
            scheduleDataObj[item.gym] = [[], [], [], [], [], [], []];
            scheduleDataObj[item.gym][itemWeekDayIndex] = [item];
          } else {
            scheduleDataObj[item.gym][itemWeekDayIndex].push(item);
          }
        });

        setScheduleInfo(scheduleDataObj); // Set klass data to state
      });
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
      const requestParams = Object.entries(newParamsObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      setFilterParams(newParamsObj); // Установить параметры в адресную строку

      // Получение всех занятий
      api.get(`klass/?${requestParams}`).then(({ data }) => {
        data.length === 0 ? setNoClassMsg('Занятий нет') : setNoClassMsg('');

        const scheduleDataObj = {}; // create new schedule obj

        data.forEach((item) => {
          let itemWeekDayIndex = new Date(item.date).getDay(); // получение индекса расположения занятия в неделе
          itemWeekDayIndex === 0 ? (itemWeekDayIndex = 6) : itemWeekDayIndex--; // его позиция в массиве занятий

          if (!scheduleDataObj[item.gym]) {
            scheduleDataObj[item.gym] = [[], [], [], [], [], [], []];
            scheduleDataObj[item.gym][itemWeekDayIndex] = [item];
          } else {
            scheduleDataObj[item.gym][itemWeekDayIndex].push(item);
          }
        });

        setScheduleInfo(scheduleDataObj); // Set klass data to state
      });
    } else {
      // Если есть параметры недели и любые другие или только для недели
      // установить смещение недели
      const startDateParams = filterParams.get('start_date'); // Начало недели из параметров
      const endDateParams = filterParams.get('end_date'); // Конец недели из параметров
      const millisecondsInWeek = 24 * 60 * 60 * 1000; // Количество миллисек в дне
      const weekShift = (Date.parse(startDateParams) - Date.parse(startDate)) / millisecondsInWeek; // Разница в днях

      // Начало и конец недели для кнопки фильтра
      const newStartDateFilterName = startDateParams.split('-').slice(1).reverse().join('.');
      const endDateArr = endDateParams.split('-').slice(1).reverse(); // Массив даты конца недели
      // Уменьшить день на единицу и вернуть строку в правильном формате
      const newEndDateFilterName = endDateArr.map((item, index) =>
        index === 0 ? (+item-- < 10 ? `0${+item--}` : +item) : item
      );

      setShiftWeekCounter(weekShift); // Set new week shift state
      setWeekFilterName(`${newStartDateFilterName} - ${newEndDateFilterName}`); // Set filter week name
      setWeek(weekRange(weekShift)); // Set week data form params on load page

      // Создать новый объект с параметрами
      const newParamsObj = {};

      // Взять существующие параметры и сформировать новый объект
      for (let [key, value] of filterParams.entries()) {
        newParamsObj[key] = value;
      }

      // Сформировать строку для запроса
      const requestParams = Object.entries(newParamsObj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      // Получение всех занятий
      api.get(`klass/?${requestParams}`).then(({ data }) => {
        data.length === 0 ? setNoClassMsg('Занятий нет') : setNoClassMsg('');

        const scheduleDataObj = {}; // create new schedule obj

        data.forEach((item) => {
          let itemWeekDayIndex = new Date(item.date).getDay(); // получение индекса расположения занятия в неделе
          itemWeekDayIndex === 0 ? (itemWeekDayIndex = 6) : itemWeekDayIndex--; // его позиция в массиве занятий

          if (!scheduleDataObj[item.gym]) {
            scheduleDataObj[item.gym] = [[], [], [], [], [], [], []];
            scheduleDataObj[item.gym][itemWeekDayIndex] = [item];
          } else {
            scheduleDataObj[item.gym][itemWeekDayIndex].push(item);
          }
        });

        setScheduleInfo(scheduleDataObj); // Set klass data to state
      });
    }

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
    const lastDayWeek =
      +changedWeekArray[6].day + 1 < 10 ? `0${+changedWeekArray[6].day + 1}` : +changedWeekArray[6].day + 1;

    const endDate = `${changedWeekArray[6].year}-${changedWeekArray[6].month}-${lastDayWeek}`;

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
      data.length === 0 ? setNoClassMsg('Занятий нет') : setNoClassMsg('');

      const scheduleDataObj = {}; // create new schedule obj

      data.forEach((item) => {
        let itemWeekDayIndex = new Date(item.date).getDay(); // получение индекса расположения занятия в неделе
        itemWeekDayIndex === 0 ? (itemWeekDayIndex = 6) : itemWeekDayIndex--; // его позиция в массиве занятий

        if (!scheduleDataObj[item.gym]) {
          scheduleDataObj[item.gym] = [[], [], [], [], [], [], []];
          scheduleDataObj[item.gym][itemWeekDayIndex] = [item];
        } else {
          scheduleDataObj[item.gym][itemWeekDayIndex].push(item);
        }
      });

      setScheduleInfo(scheduleDataObj); // Set klass data to state
    });
  };

  return (
    <MenuFilterContext.Provider
      value={{ trainers, gym, level, trainingType, filterParams, setFilterParams, setNoClassMsg, setScheduleInfo }}
    >
      <ClassContext.Provider value={{ setJoinClassAlert }}>
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

                    setWeek(prevWeekRangeArr); // Set prev week data
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

                    setWeek(nextWeekRangeArr); // Set next week data
                    setShiftWeekCounter((prevState) => prevState + 7); // Set new week shift state
                  }}
                >
                  <ArrowRight />
                </div>
              </div>
            </div>

            {/*** Schedule content ***/}
            <div className="schedule__table">
              {/* Schedule table error notification */}
              {joinClassAlert && (
                <Alert className="join-class-error" variant="outlined" severity="warning">
                  {joinClassAlert}
                </Alert>
              )}

              {/* Schedule table header */}
              <div className="schedule__header">
                <div className="schedule__row">
                  <div className="schedule__column">
                    <span>
                      {week[0]?.monthName}
                      {week[0]?.monthName !== week[6]?.monthName && ` - ${week[6]?.monthName}`}
                    </span>
                  </div>

                  {week.map(({ id, dayName, day, month }) => {
                    return (
                      <div className="schedule__column" key={id}>
                        <span>{dayName}</span>
                        <span>{`${day}.${month}`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Schedule table body */}
              <div className="schedule__body">
                {/* No class message */}
                {noClassMsg && <div className="schedule__row no-class">{noClassMsg}</div>}

                {/* Class data */}
                {Object.entries(scheduleInfo).map(([gymName, gymClass], index) => {
                  return (
                    <div className="schedule__row" key={index}>
                      {/* Вывести название зала */}
                      <div className="schedule__column">
                        <span>станция метро {gymName}</span>

                        <div className="schedule__column-icon">
                          <Metro />
                        </div>
                      </div>

                      {/* Вывести занятия на неделе для этого зала */}
                      {gymClass.map((dayClass, index) => {
                        return (
                          <div className="schedule__column" key={index}>
                            {/* Вывести занятия в этот день для этого зала */}
                            {dayClass.map((dayClassItem, index) => (
                              <ScheduleClass classData={dayClassItem} key={index} />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </ClassContext.Provider>
    </MenuFilterContext.Provider>
  );
};

export default SchedulePage;
