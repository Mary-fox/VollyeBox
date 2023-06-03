import React, { useContext, useEffect, useState } from 'react';
import { Drawer, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// Files
import './ScheduleFilterMob.scss';
import { api } from '../../../constants/constants';

// Components
import CloseMenu from '../../../components/IconComponents/CloseMenu';
import DropDownIcon from '../../../components/IconComponents/DropDownIcon';

// Context
import { MenuFilterContext } from '../SchedulePage';

const ScheduleFilterMob = () => {
  // Get data for menu filter from context
  const { trainers, gym, level, trainingType, filterParams, setFilterParams } = useContext(MenuFilterContext);

  // Pseudo api data for gender
  const gender = [
    { id: 1, title: 'a', name: 'Общий' },
    { id: 2, title: 'm', name: 'Мужской' },
    { id: 3, title: 'f', name: 'Женский' },
  ];

  /*** Filter menu states ***/
  // Trainer menu and active trainer filter state
  const [trainersMenuId, setTrainersMenuId] = useState(null);

  // Gym menu and active gym filter state
  const [gymMenuId, setGymMenuId] = useState(null);

  // Level menu and active level filter state
  const [levelMenuId, setLevelMenuId] = useState(null);

  // Training menu and active training type filter state
  const [trainingTypeMenuId, setTrainingTypeMenuId] = useState(null);

  // Gender menu and active gender filter state
  const [genderMenuId, setGenderMenuId] = useState(null);

  // Side menu state
  const [filterSideMenu, setFilterSideMenu] = useState(false);

  useEffect(() => {
    // Set selected trainer id if it's in params
    if (filterParams.has('trainer') && trainers.length > 0) {
      const paramValue = filterParams.get('trainer');
      const activeTrainerObject = trainers.filter(({ id }) => +id === +paramValue)[0];

      setTrainersMenuId(activeTrainerObject.id);
    }

    // Set selected gym id if it's in params
    if (filterParams.has('gym') && gym.length > 0) {
      const paramValue = filterParams.get('gym');
      const activeGymObject = gym.filter(({ id }) => +id === +paramValue)[0];

      setGymMenuId(activeGymObject.id);
    }

    // Set selected level id if it's in params
    if (filterParams.has('level') && level.length > 0) {
      const paramValue = filterParams.get('level');
      const activeLevelObject = level.filter(({ id }) => +id === +paramValue)[0];

      setLevelMenuId(activeLevelObject.id);
    }

    // Set selected training-type id if it's in params
    if (filterParams.has('type') && trainingType.length > 0) {
      const paramValue = filterParams.get('type');
      const activeTrainingTypeObject = trainingType.filter(({ id }) => +id === +paramValue)[0];

      setTrainingTypeMenuId(activeTrainingTypeObject.id);
    }

    // Set selected gender if it's in params
    if (filterParams.has('gender')) {
      const paramValue = filterParams.get('gender');
      const activeGenderObject = gender.filter(({ title }) => title === paramValue)[0];

      setGenderMenuId(activeGenderObject.id);
    }
  }, [trainers, gym, level, trainingType]);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setFilterSideMenu(!filterSideMenu);
  };

  // Получение отфильтрованных занятий
  const addFilterHandler = (filterType, id, genderTitle) => {
    // Если выбор гендера, то использовать его title вместо id
    if (genderTitle) {
      id = genderTitle;
    }

    // Если параметр этого фильтра с таким значением уже есть, то не делать никаких запросов
    if (filterParams.has(filterType) && filterParams.get(filterType) === id.toString()) {
      return;
    }

    // Создать новый объект с параметрами
    const newParamsObj = {};

    // Взять существующие параметры и сформировать новый объект
    for (let [key, value] of filterParams.entries()) {
      newParamsObj[key] = value;
    }

    // Добавить новый параметр в объекты фильтра
    newParamsObj[filterType] = id;

    // Сформировать строку для запроса
    const paramsString = Object.entries(newParamsObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Установить параметры в адресную строку
    setFilterParams(newParamsObj);

    // Запрос для фильтрации
    api.get(`klass/?${paramsString}`).then(({ data }) => {
      console.log(data, 'klass data after add filter param');
    });
  };

  const selectedClass = (id, state) => (state === id ? 'selected' : '');

  return (
    <>
      <button className="filter-btn-mob" aria-label="filters" onClick={toggleDrawer}>
        Фильтры
      </button>

      <Drawer classes={{ paper: 'filter-menu-wrapper-mob' }} anchor="left" open={filterSideMenu} onClose={toggleDrawer}>
        <div className="filter-menu-mob" role="presentation">
          <div className="filter-menu-mob__heading">
            <h3 className="filter-menu-mob__title">Фильтры</h3>

            <div className="filter-menu-mob__close" onClick={toggleDrawer}>
              <CloseMenu />
            </div>
          </div>

          <div className="filter-menu-mob__body">
            {/* Trainer */}
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>тренер</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {trainers.map(({ id, first_name, last_name }) => {
                    return (
                      <li
                        key={id}
                        onClick={() => {
                          setTrainersMenuId(id);
                          addFilterHandler('trainer', id);
                        }}
                      >
                        <span className={selectedClass(id, trainersMenuId)}>
                          {last_name} {first_name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Gym */}
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>залы</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {gym.map(({ id, name, is_published }) => {
                    if (is_published) {
                      return (
                        <li
                          key={id}
                          onClick={() => {
                            setGymMenuId(id);
                            addFilterHandler('gym', id);
                          }}
                        >
                          <span className={selectedClass(id, gymMenuId)}>{name}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Level */}
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>уровень</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {level.map(({ id, title, is_published }) => {
                    if (is_published) {
                      return (
                        <li
                          key={id}
                          onClick={() => {
                            setLevelMenuId(id);
                            addFilterHandler('level', id); // Add filter param
                          }}
                        >
                          <span className={selectedClass(id, levelMenuId)}>{title}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Training type */}
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>тип тренировки</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {trainingType.map(({ id, title, is_published }, index) => {
                    if (is_published) {
                      return (
                        <li
                          key={id}
                          onClick={() => {
                            setTrainingTypeMenuId(id);
                            addFilterHandler('type', id); // Add filter param
                          }}
                        >
                          <span className={selectedClass(id, trainingTypeMenuId)}>{title}</span>
                        </li>
                      );
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            {/* Gender */}
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>гендер тренировки</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {gender.map(({ id, title, name }) => {
                    return (
                      <li
                        key={id}
                        onClick={() => {
                          setGenderMenuId(id);
                          addFilterHandler('gender', id, title); // Add filter param
                        }}
                      >
                        <span className={selectedClass(id, genderMenuId)}>{name}</span>
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ScheduleFilterMob;
