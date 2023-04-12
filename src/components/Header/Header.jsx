import React from 'react';
import './Header.scss';
import DropdownMenu from './DropdownMenu/DropdownMenu';
// import logo 

function Header (props) {

  return (
    <header className='header'>
        <div className="header__wrapper">
            <div className="header__content">
              <div className="header__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
              </div>
              <div className="header__items">
                  <DropdownMenu />
              </div>
            </div>
        </div>    
    </header>
  );
};

export default Header;