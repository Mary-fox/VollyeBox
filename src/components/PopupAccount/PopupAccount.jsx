import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupAccount.scss';
import { Link } from 'react-router-dom';
import { api } from '../../constants/constants';
import popupClose from '../../assets/icon/close-popup.svg';

function PopupAccount(props) {
  const navigate = useNavigate();
  const { isPopupAccountOpen, setIsPopupAccountOpen, isAuthenticated, setIsAuthenticated } = props;
  const [errors, setErrors] = useState();
  function handleIconClick() {
    setIsPopupAccountOpen(!isPopupAccountOpen);
  }
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errors: {},
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // errors[name] = '';
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post('token/', formData)
      .then((response) => {
        // обработка успешного ответа
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        if (response.status === 200) {
          navigate('/');
          setIsPopupAccountOpen(!isPopupAccountOpen);
          setIsAuthenticated(!isAuthenticated);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrors('Неверно введены данные');
        } else if (error.response.status === 400) {
          setErrors('Заполнены не все поля');
        } else {
          console.error(error);
        }
      });
  };
  return (
    <div className={`popup-account ${isPopupAccountOpen ? 'popup-account--open' : ''}`}>
      <div className="popup-account__wrapper">
        <Link className="popup-account__logo" to="/">
          <img src={require('../../assets/images/logo.png')} alt="logo" />
        </Link>
        <button className="popup-account__close" onClick={() => handleIconClick()}>
          <img src={popupClose} alt="close" />
        </button>
        <form className="popup-form" onSubmit={handleSubmit}>
          <label className="popup__item popup__input-login">
            <input
              type="text"
              name="username"
              placeholder="Логин*"
              onChange={handleInputChange}
              className="popup__login"
              value={formData.username}
            />
          </label>
          <label className="popup-form__item popup-form__input-password">
            <input
              type="password"
              name="password"
              placeholder="Пароль*"
              autoComplete="new-password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <p className="popup-form__info">Формы, обязательные к заполнению</p>
          <Link className="popup-form__text" to="/recovery-password-email/">
            Забыли пароль?
          </Link>
          <div className={`error ${errors ? 'error_active' : ''}`}>{errors}</div>
          <button type="submit" className="popup-form__btn">
            Вход
          </button>
          <button
            type="button"
            className="popup-form__btn popup-form__btn_black"
            onClick={() => navigate('/registration')}
          >
            Регистрация
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupAccount;
