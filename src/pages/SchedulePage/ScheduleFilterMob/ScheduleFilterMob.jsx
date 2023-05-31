import React, { useContext, useState } from 'react';
import { Drawer, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

// Files
import './ScheduleFilterMob.scss';

// Components
import CloseMenu from '../../../components/IconComponents/CloseMenu';
import DropDownIcon from '../../../components/IconComponents/DropDownIcon';

// Context
import { MenuFilterContext } from '../SchedulePage';

const ScheduleFilterMob = () => {
  // Get data for menu filter from context
  const { trainers, gym, level, trainingType } = useContext(MenuFilterContext);

  // State
  const [filterSideMenu, setFilterSideMenu] = useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setFilterSideMenu(!filterSideMenu);
  };

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
            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>тренер</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {trainers.map(({ id, first_name, last_name }) => {
                    return (
                      <li key={id}>
                        {last_name} {first_name}
                      </li>
                    );
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>залы</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {gym.map(({ id, name, is_published }) => {
                    if (is_published) {
                      return <li key={id}>{name}</li>;
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>уровень</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {level.map(({ id, title, is_published }) => {
                    if (is_published) {
                      return <li key={id}>{title}</li>;
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>тип тренировки</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  {trainingType.map(({ id, title, is_published }) => {
                    if (is_published) {
                      return <li key={id}>{title}</li>;
                    }
                  })}
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion disableGutters square classes={{ root: 'filter-menu-mob__accordion' }}>
              <AccordionSummary expandIcon={<DropDownIcon />}>гендер тренировки</AccordionSummary>

              <AccordionDetails>
                <ul className="filter-menu-mob__list">
                  <li>Мужчина</li>
                  <li>Женцина</li>
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
