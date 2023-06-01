import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

// Files
import './ScheduleFilter.scss';
import { api } from '../../../constants/constants';

// Components
import DropDownIcon from '../../../components/IconComponents/DropDownIcon';

// Context
import { MenuFilterContext } from '../SchedulePage';

const ScheduleFilter = () => {
  // Get data for menu filter from context
  const { trainers, gym, level, trainingType } = useContext(MenuFilterContext);

  // Pseudo api data for gender
  const gender = [
    { id: 1, title: 'a', name: 'Общий' },
    { id: 2, title: 'm', name: 'Мужской' },
    { id: 3, title: 'f', name: 'Женский' },
  ];

  /*** Filter menu states ***/
  // Trainer menu and active trainer filter state
  const [trainersMenu, setTrainersMenu] = useState(null);
  const [activeTrainerFilter, setActiveTrainerFilter] = useState('тренер');

  // Gym menu and active gym filter state
  const [gymMenu, setGymMenu] = useState(null);
  const [activeGymFilter, setActiveGymFilter] = useState('зал');

  // Level menu and active level filter state
  const [levelMenu, setLevelMenu] = useState(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState('уровень');

  // Training menu and active training type filter state
  const [trainingTypeMenu, setTrainingTypeMenu] = useState(null);
  const [activeTrainingTypeFilter, setActiveTrainingTypeFilter] = useState('тип тренировки');

  // Gender menu and active gender filter state
  const [genderMenu, setGenderMenu] = useState(null);
  const [activeGenderFilter, setActiveGenderFilter] = useState('гендер тренировки');

  /*** Filter search params ***/
  const [filterParams, setFilterParams] = useSearchParams();

  // Get klass data with/without params on page load
  useEffect(() => {
    let requestParams = '';

    // Check if search params - make new str for request with params
    if (filterParams.toString() !== '') {
      // Make new string for request with params
      const requestStr = [];

      for (let [key, value] of filterParams.entries()) {
        requestStr.push(`${key}=${value}`);
      }

      requestParams = `?${requestStr.join('&')}`;
    }

    // Получение всех занятий
    api.get(`klass/${requestParams}`).then(({ data }) => {
      console.log(data, 'klass data on load page');
    });
  }, []);

  // Set selected params to filter menu on page load
  useEffect(() => {
    // Set trainer name if it's in params
    if (filterParams.has('trainer') && trainers.length > 0) {
      const paramValue = filterParams.get('trainer');
      const activeTrainerObject = trainers.filter(({ id }) => +id === +paramValue)[0];

      setActiveTrainerFilter(`${activeTrainerObject.last_name} ${activeTrainerObject.first_name}`);
    }

    // Set gym name if it's in params
    if (filterParams.has('gym') && gym.length > 0) {
      const paramValue = filterParams.get('gym');
      const activeGymObject = gym.filter(({ id }) => +id === +paramValue)[0];

      setActiveGymFilter(activeGymObject.name);
    }

    // Set level name if it's in params
    if (filterParams.has('level') && level.length > 0) {
      const paramValue = filterParams.get('level');
      const activeLevelObject = level.filter(({ id }) => +id === +paramValue)[0];

      setActiveLevelFilter(activeLevelObject.title);
    }

    // Set training-type name if it's in params
    if (filterParams.has('type') && trainingType.length > 0) {
      const paramValue = filterParams.get('type');
      const activeTrainingTypeObject = trainingType.filter(({ id }) => +id === +paramValue)[0];

      setActiveTrainingTypeFilter(activeTrainingTypeObject.title);
    }

    // Set gender name if it's in params
    if (filterParams.has('gender')) {
      const paramValue = filterParams.get('gender');
      const activeGenderObject = gender.filter(({ title }) => title === paramValue)[0];

      setActiveGenderFilter(activeGenderObject.name);
    }
  }, [trainers, gym, level, trainingType]);

  /*** Handlers ***/
  // Close all previous opened menu
  const handleClosePreviousMenu = () => {
    setTrainersMenu(null);
    setGymMenu(null);
    setLevelMenu(null);
    setTrainingTypeMenu(null);
    setGenderMenu(null);
  };

  // Получение отфильтрованных занятий
  const addFilterHandler = (filterType, id, genderTitle) => {
    // Если выбор гендера, то использовать его title вместо id
    if (genderTitle) {
      id = genderTitle;
    }

    // Если параметр этого фильтра с таким значением уже есть, то не делать никаких запросов
    if (filterParams.has(filterType) && filterParams.get(filterType) === id.toString()) {
      handleClosePreviousMenu();
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

  // Получение отфильтрованных занятий после удаления параметра (пункт ---Все---)
  const deleteFilterHandler = (deleteParam) => {
    // Удаление параметра
    filterParams.delete(deleteParam);

    // Создать новый объект с параметрами
    const newParamsObj = {};

    // Взять существующие параметры и сформировать новый объект
    for (let [key, value] of filterParams.entries()) {
      newParamsObj[key] = value;
    }

    // Сформировать строку для запроса
    const paramsString = Object.entries(newParamsObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Установить параметры в адресную строку
    setFilterParams(newParamsObj);

    // Запрос для фильтрации
    api.get(`klass/?${paramsString}`).then(({ data }) => {
      console.log(data, 'klass data after delete filter param');
    });
  };

  return (
    <ul className="schedule-main-filter">
      {/* Trainer */}
      <li className="schedule-main-filter__item">
        <span
          className={`schedule-main-filter__title ${trainersMenu ? 'expanded' : ''}`}
          aria-controls={trainersMenu ? 'trainer-menu-filter' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            handleClosePreviousMenu();
            setTrainersMenu(event.currentTarget);
          }}
        >
          {activeTrainerFilter}
          <DropDownIcon />
        </span>

        <Menu
          id="trainer-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={trainersMenu}
          open={!!trainersMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem
            onClick={() => {
              // Если параметра этого фильтра нет, то не делать никаких запросов
              if (!filterParams.has('trainer')) {
                handleClosePreviousMenu();
                return;
              }

              setActiveTrainerFilter('тренер'); // Set default value
              deleteFilterHandler('trainer'); // Delete param
              handleClosePreviousMenu();
            }}
          >
            --- Все ---
          </MenuItem>

          {trainers.map(({ id, first_name, last_name }) => {
            return (
              <MenuItem
                key={id}
                onClick={() => {
                  addFilterHandler('trainer', id); // Add filter param
                  setActiveTrainerFilter(`${last_name} ${first_name}`); // Set selected name
                  handleClosePreviousMenu();
                }}
              >
                {last_name} {first_name}
              </MenuItem>
            );
          })}
        </Menu>
      </li>

      {/* Gym */}
      <li className="schedule-main-filter__item">
        <span
          className={`schedule-main-filter__title ${gymMenu ? 'expanded' : ''}`}
          aria-controls={gymMenu ? 'gym-menu-filter' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            handleClosePreviousMenu();
            setGymMenu(event.currentTarget);
          }}
        >
          {activeGymFilter}
          <DropDownIcon />
        </span>

        <Menu
          id="gym-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={gymMenu}
          open={!!gymMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem
            onClick={() => {
              // Если параметра этого фильтра нет, то не делать никаких запросов
              if (!filterParams.has('gym')) {
                handleClosePreviousMenu();
                return;
              }

              setActiveGymFilter('зал'); // Set default value
              deleteFilterHandler('gym'); // Delete param
              handleClosePreviousMenu();
            }}
          >
            --- Все ---
          </MenuItem>

          {gym.map(({ id, name, is_published }) => {
            if (is_published) {
              return (
                <MenuItem
                  key={id}
                  onClick={() => {
                    addFilterHandler('gym', id); // Add filter param
                    setActiveGymFilter(name); // Set selected name
                    handleClosePreviousMenu();
                  }}
                >
                  {name}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

      {/* Level */}
      <li className="schedule-main-filter__item">
        <span
          className={`schedule-main-filter__title ${levelMenu ? 'expanded' : ''}`}
          aria-controls={levelMenu ? 'level-menu-filter' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            handleClosePreviousMenu();
            setLevelMenu(event.currentTarget);
          }}
        >
          {activeLevelFilter}
          <DropDownIcon />
        </span>

        <Menu
          id="level-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={levelMenu}
          open={!!levelMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem
            onClick={() => {
              // Если параметра этого фильтра нет, то не делать никаких запросов
              if (!filterParams.has('level')) {
                handleClosePreviousMenu();
                return;
              }

              setActiveLevelFilter('уровень'); // Set default value
              deleteFilterHandler('level'); // Delete param
              handleClosePreviousMenu();
            }}
          >
            --- Все ---
          </MenuItem>

          {level.map(({ id, title, is_published }) => {
            if (is_published) {
              return (
                <MenuItem
                  key={id}
                  onClick={() => {
                    addFilterHandler('level', id); // Add filter param
                    setActiveLevelFilter(title); // Set selected name
                    handleClosePreviousMenu();
                  }}
                >
                  {title}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

      {/* Training type */}
      <li className="schedule-main-filter__item">
        <span
          className={`schedule-main-filter__title ${trainingTypeMenu ? 'expanded' : ''}`}
          aria-controls={trainingTypeMenu ? 'training-type-menu-filter' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            handleClosePreviousMenu();
            setTrainingTypeMenu(event.currentTarget);
          }}
        >
          {activeTrainingTypeFilter}
          <DropDownIcon />
        </span>

        <Menu
          id="training-type-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={trainingTypeMenu}
          open={!!trainingTypeMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem
            onClick={() => {
              // Если параметра этого фильтра нет, то не делать никаких запросов
              if (!filterParams.has('type')) {
                handleClosePreviousMenu();
                return;
              }

              setActiveTrainingTypeFilter('тип тренировки'); // Set default value
              deleteFilterHandler('type'); // Delete param
              handleClosePreviousMenu();
            }}
          >
            --- Все ---
          </MenuItem>

          {trainingType.map(({ id, title, is_published }) => {
            if (is_published) {
              return (
                <MenuItem
                  key={id}
                  onClick={() => {
                    addFilterHandler('type', id); // Add filter param
                    setActiveTrainingTypeFilter(title); // Set selected name
                    handleClosePreviousMenu();
                  }}
                >
                  {title}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

      {/* Gender */}
      <li className="schedule-main-filter__item">
        <span
          className={`schedule-main-filter__title ${genderMenu ? 'expanded' : ''}`}
          aria-controls={genderMenu ? 'gender-menu-filter' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            handleClosePreviousMenu();
            setGenderMenu(event.currentTarget);
          }}
        >
          {activeGenderFilter}
          <DropDownIcon />
        </span>

        <Menu
          id="gender-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={genderMenu}
          open={!!genderMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem
            onClick={() => {
              // Если параметра этого фильтра нет, то не делать никаких запросов
              if (!filterParams.has('gender')) {
                handleClosePreviousMenu();
                return;
              }

              setActiveGenderFilter('Гендер тренеровки'); // Set default value
              deleteFilterHandler('gender'); // Delete param
              handleClosePreviousMenu();
            }}
          >
            --- Все ---
          </MenuItem>

          {gender.map(({ id, title, name }) => {
            return (
              <MenuItem
                key={id}
                onClick={() => {
                  addFilterHandler('gender', id, title); // Add filter param
                  setActiveGenderFilter(name); // Set selected name
                  handleClosePreviousMenu();
                }}
              >
                {name}
              </MenuItem>
            );
          })}
        </Menu>
      </li>
    </ul>
  );
};

export default ScheduleFilter;
