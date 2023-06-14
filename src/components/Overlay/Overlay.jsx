import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Files
import './Overlay.scss';
import logo from './logo.png';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';

// Components
import CloseMenu from '../IconComponents/CloseMenu';
import Social from '../Social/Social';
import DropDownIcon from '../IconComponents/DropDownIcon';

const Overlay = (props) => {
  const { isMenuOpen, setIsMenuOpen, menu } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsMenuOpen(!isMenuOpen);

  const linkUp = menu.filter(({ position }) => position === 'u');
  const dropdownLink = linkUp.filter(({ children }) => children.length !== 0); //массивы с children
  const headerLink = linkUp.filter(({ children }) => children.length === 0); //пункты хедера без тренировок

  return (
    <div className={`overlay ${isMenuOpen ? 'overlay--open' : ''}`}>
      <div className="container">
        <div className="overlay__header">
          <div className="overlay__logo">
            <img src={logo} alt="logo" title="logo" />
          </div>

          <div className="overlay__close" onClick={handleClose}>
            <CloseMenu />
          </div>
        </div>

        <div className="overlay__body">
          <nav className="overlay__nav">
            <button className="accordion__btn" onClick={handleToggle}>
              {dropdownLink.length > 0 && dropdownLink[0].title}

              <span className={`accordion__btn-icon ${isOpen ? 'dropdown__menu_open' : 'dropdown__menu_close'}`}>
                <DropDownIcon />
              </span>
            </button>

            {dropdownLink &&
              dropdownLink.map(({ slug, children }) => (
                <ul key={slug} className={`accordion ${isOpen ? 'accordion--active' : ''}`}>
                  {children.map(({ slug, title }) => (
                    <li className="accordion__item" key={slug}>
                      <Link to={slug} onClick={handleClose}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}

            <ul className="overlay__list">
              {headerLink.map(({ id, slug, title }) => (
                <li className="overlay__list-item" key={id}>
                  <Link to={slug} onClick={handleClose}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="overlay__footer">
          <div className="overlay__icons">
            <a href="tel:8888888">
              <img src={phone} alt="icon phone" />
            </a>

            <Link to="#!">
              <img src={user} alt="icon user" />
            </Link>

            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
