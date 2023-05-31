import React, { useContext, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

// Files
import './ScheduleFilter.scss';

// Components
import DropDownIcon from '../../../components/IconComponents/DropDownIcon';

// Context
import { MenuFilterContext } from '../SchedulePage';

const ScheduleFilter = () => {
  // Get data for menu filter from context
  const { trainers, gym, level, trainingType } = useContext(MenuFilterContext);

  // Filter menu states
  const [trainersMenu, setTrainersMenu] = useState(null); // Trainer menu
  const [gymMenu, setGymMenu] = useState(null); // Gym menu
  const [levelMenu, setLevelMenu] = useState(null); // Level menu
  const [trainingTypeMenu, setTrainingTypeMenu] = useState(null); // Training menu
  const [genderMenu, setGenderMenu] = useState(null); // Gender menu

  // Close all previous opened menu
  const handleClosePreviousMenu = () => {
    setTrainersMenu(null);
    setGymMenu(null);
    setLevelMenu(null);
    setTrainingTypeMenu(null);
    setGenderMenu(null);
  };

  return (
    <ul className="schedule-main-filter">
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
          тренер
          <DropDownIcon />
        </span>

        <Menu
          id="trainer-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={trainersMenu}
          open={!!trainersMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem onClick={handleClosePreviousMenu}>--- Все ---</MenuItem>

          {trainers.map(({ id, first_name, last_name }) => {
            return (
              <MenuItem onClick={handleClosePreviousMenu} key={id}>
                {last_name} {first_name}
              </MenuItem>
            );
          })}
        </Menu>
      </li>

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
          Зал
          <DropDownIcon />
        </span>

        <Menu
          id="gym-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={gymMenu}
          open={!!gymMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem onClick={handleClosePreviousMenu}>--- Все ---</MenuItem>

          {gym.map(({ id, name, is_published }) => {
            if (is_published) {
              return (
                <MenuItem onClick={handleClosePreviousMenu} key={id}>
                  {name}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

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
          уровень
          <DropDownIcon />
        </span>

        <Menu
          id="level-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={levelMenu}
          open={!!levelMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem onClick={handleClosePreviousMenu}>--- Все ---</MenuItem>

          {level.map(({ id, title, is_published }) => {
            if (is_published) {
              return (
                <MenuItem onClick={handleClosePreviousMenu} key={id}>
                  {title}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

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
          Тип тренировки
          <DropDownIcon />
        </span>

        <Menu
          id="training-type-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={trainingTypeMenu}
          open={!!trainingTypeMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem onClick={handleClosePreviousMenu}>--- Все ---</MenuItem>

          {trainingType.map(({ id, title, is_published }) => {
            if (is_published) {
              return (
                <MenuItem onClick={handleClosePreviousMenu} key={id}>
                  {title}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </li>

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
          Гендер тренеровки
          <DropDownIcon />
        </span>

        <Menu
          id="gender-menu-filter"
          classes={{ paper: 'dropdown-menu' }}
          anchorEl={genderMenu}
          open={!!genderMenu}
          onClose={handleClosePreviousMenu}
        >
          <MenuItem onClick={handleClosePreviousMenu}>--- Все ---</MenuItem>
          <MenuItem onClick={handleClosePreviousMenu}>Мужчина</MenuItem>
          <MenuItem onClick={handleClosePreviousMenu}>Женцина</MenuItem>
        </Menu>
      </li>
    </ul>
  );
};

export default ScheduleFilter;
