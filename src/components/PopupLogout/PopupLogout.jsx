import React from 'react';
import './PopupLogout.scss';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'

import popupClose from '../../assets/icon/close-popup.svg';


function PopupLogout(props) {
    const navigate = useNavigate()
    const { isPopupLogoutOpen, setIsPopupLogoutOpen, isAuthenticated, setIsAuthenticated} = props;

    function handleIconClick() {
      setIsPopupLogoutOpen(!isPopupLogoutOpen);
    }
    const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
      setIsPopupLogoutOpen(!isPopupLogoutOpen);
      setIsAuthenticated(!isAuthenticated)
    }
    return (
      
    <div className={`popup-logout ${isPopupLogoutOpen ? 'popup-logout--open' : ''}`} >
        <div className='popup-logout__content popup-logout__wrapper'>
          <Link className='popup-logout__logo' to="/">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </Link>
          <button className="popup-logout__close" onClick={() => handleIconClick()}><img src={popupClose} alt='close'/></button>
          <p className="popup-logout__text">Выйти из аккаунта?</p>
          <button className='popup-logout__btn' onClick={logout}>Выход</button>
        </div>
    </div>

    );
  }
  
  export default PopupLogout;
  

