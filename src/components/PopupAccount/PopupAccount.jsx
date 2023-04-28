import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom'
import './PopupAccount.scss';
import { Link } from 'react-router-dom';
import popupClose from '../../assets/icon/close-popup.svg';
function PopupAccount(props) {
    const navigate = useNavigate();
    const { isPopupAccountOpen, setIsPopupAccountOpen} = props;
    function handleIconClick() {
      setIsPopupAccountOpen(!isPopupAccountOpen);
    }
    const [formData, setFormData] = useState({
      phone: '',
      password: '',
      errors:{}
    });
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value})
      // errors[name] = '';
    }; 
    return (
    <div className={`popup-account ${isPopupAccountOpen ? 'popup-account--open' : ''}`} >
        <div className='popup-account__wrapper'>
          <Link className='popup-account__logo' to="/">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </Link>
          <button className="popup-account__close" onClick={() => handleIconClick()}><img src={popupClose} alt='close'/></button>
          <form className="popup-form">
            <label className="popup-form__item popup-form__input-phone">
                    <input  type="tel" name="phone" value={formData.phone}    onChange={handleInputChange}
                                        className="popup-form__phone"
                                        placeholder="Телефон*"/>
            </label>
            <label className="popup-form__item popup-form__input-password">
                        <input type="password" name="password" placeholder="Пароль*" autoComplete="new-password" onChange={handleInputChange}
                                                value={formData.password} />
            </label>
            <p className='popup-form__info'>Формы, обязательные к заполнению</p>
            <Link className="popup-form__text" to="#!">Забыли пароль?</Link>
            <button type="submit" className='popup-form__btn'>Вход</button>
            <button type="submit" className='popup-form__btn popup-form__btn_black' onClick={() => navigate('/registration')}>Регистрация</button>
          </form>
        </div>
    </div>

    );
  }
  
  export default PopupAccount;
  

