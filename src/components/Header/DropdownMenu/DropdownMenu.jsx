import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Files
import './DropdownMenu.scss';
import icon from '../../../assets/icon/dropdown-icon.svg';

const DropdownMenu = ({ menu }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(!isOpen);
  const handleMouseLeave = () => setIsOpen(!isOpen);

  const linkUp = menu.filter((item) => item.position === 'u');
  const dropdownLink = linkUp.filter((item) => item.children.length !== 0); //массивы с children

  return (
    <div ref={dropdownRef} className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="dropdown__btn">
        {dropdownLink.length > 0 && <p>{dropdownLink[0].title}</p>}
        <img src={icon} alt="Меню" className={isOpen ? 'dropdown__menu_open' : 'dropdown__menu_close'} />
      </button>

      {isOpen &&
        dropdownLink &&
        dropdownLink.map((item) => (
          <div key={item.slug} className={`dropdown__content ${isOpen ? 'dropdown__content_active' : ''}`}>
            {item.children.map((child) => (
              <Link className="dropdown__item" to={child.slug} key={child.id}>
                {child.title}
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

export default DropdownMenu;
