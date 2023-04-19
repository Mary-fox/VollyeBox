import React, { useState } from 'react';
import './DropdownMenu.scss';
import icon from '../../../assets/icon/dropdown-icon.svg';

function DropdownMenu({data}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const linkUp = data.filter(item => item.position === "u");
  const dropdownLink = linkUp.filter(item => item.children.length !== 0); //массивы с children

  return (
    <div className="dropdown">
      <button className="dropdown__btn" onClick={handleToggle}>
        {dropdownLink.length > 0 && (<p>{dropdownLink[0].title}</p>)}
        <img src={icon} alt="Меню" className={isOpen ? 'dropdown__menu_open' : 'dropdown__menu_close'} />
      </button>
     {isOpen && (
         dropdownLink && dropdownLink.map((item) => (
          <div className={`dropdown__content ${isOpen ? 'dropdown__content_active' : ''}`}>
              {item.children.map((child) => (
                <a className='dropdown__item' href={child.slug} key={child.id}>{child.title}</a>
              ))}
            </div>
        ))
      )}
    </div>
  );
}
export default DropdownMenu;

