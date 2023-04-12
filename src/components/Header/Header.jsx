import React from 'react';
import './Header.scss';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';

function Header (props) {

  return (
    <header className='header'>
        <div className="header__wrapper">
            <div className="header__content">
              <div className="header__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
              </div>
              <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__item"><DropdownMenu /></li>
                    <li className="header__item"><Link to="#!">Расписание</Link></li>
                    <li className="header__item"><Link to="#!">Блог</Link></li>
                    <li className="header__item"><Link to="#!">Оплата</Link></li>
                </ul>
              </nav>
              <div className="header__icons">
                <a href="tel:8888888"><img src={phone} alt="icon phone"/></a>
                <Link to="#!"><img src={user} alt="icon user"/></Link>
              </div>
            </div>
        </div>    
    </header>
  );
};

export default Header;