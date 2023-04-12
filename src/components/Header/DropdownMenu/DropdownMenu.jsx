import React, { useState } from 'react';
import './DropdownMenu.scss';
import icon from '../../../assets/icon/dropdown-icon.svg';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown__btn" onClick={handleToggle}>
        <p>Тренировки</p>
        <img src={icon} alt="Меню" className={isOpen ? 'open' : 'closed'} />
      </button>
      {isOpen && (
        <div className="dropdown__content">
          <a href="#!">Виды тренировок</a>
          <a href="#!">Залы</a>
          <a href="#!">Тренеры</a>
          <a href="#!">Игровые уровни</a>
        </div>
      )}
    </div>
  );
}
export default DropdownMenu;