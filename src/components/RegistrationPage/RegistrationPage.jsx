import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';

// Files
import './RegistrationPage.scss';
import { api } from '../../constants/constants';

// Components
import BirthDayMask from '../BirthDayMask';
import RulesBlock from './RulesBlock/RulesBlock';
import Info from '../IconComponents/Info';
import DropDownIcon from '../IconComponents/DropDownIcon';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoTwo, setShowInfoTwo] = useState(false);
  const [birthDayValue, setBirthDayValue] = useState(''); // значение поля с маской даты
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    sex: '',
    password_confirmation: '',
    agreed_to_terms: false,
    personal_data: false,
    errors: {},
  });

  const genders = [
    { label: 'Мужской', value: 'm' },
    { label: 'Женский', value: 'f' },
  ];

  // если человек зарегистрирован, вместо регистрации откроется главная страница
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  /*** Handlers ***/
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    errors[name] = '';

    if (name === 'birthday') {
      setBirthDayValue(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post('sign-up/', formData)
      .then((response) => {
        // обработка успешного ответа
        if (response.data.email) {
          navigate('/confirmation-email/');
          // переход на страницу подтверждения по email
        } else if (response.data.phone) {
          navigate('/confirmation-phone/'); // переход на страницу подтверждения по телефону
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // Если есть ошибки валидации, отображаем их на странице
          setErrors(error.response.data);
        } else {
          console.error(error);
        }
      });

    // Валидация полей формы
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      password_confirmation,
      sex,
      username,
      agreed_to_terms,
      personal_data,
    } = formData;
    const errors = {};
    if (!first_name.trim()) {
      errors.first_name = 'Поле обязательно для заполнения';
    }
    if (!last_name.trim()) {
      errors.last_name = 'Поле обязательно для заполнения';
    }
    if (!email.trim()) {
      errors.email = 'Поле обязательно для заполнения';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Неправильный формат адреса электронной почты';
    }

    if (!phone) {
      errors.phone = 'Поле обязательно для заполнения';
    } else if (!/^\+?\d{11,}$/.test(phone)) {
      errors.phone = 'Некорректный номер телефона';
    }
    if (!sex) {
      errors.sex = 'Поле обязательно для заполнения';
    }
    if (!username.trim()) {
      errors.username = 'Поле обязательно для заполнения';
    }
    if (password !== password_confirmation) {
      errors.password_confirmation = 'Пароли не совпадают';
    }
    if (agreed_to_terms) {
      // отправка формы
    }
    if (personal_data) {
      // отправка формы
    }

    // Обновление состояния ошибок валидации
    setErrors(errors);

    // Если ошибок нет, отправка формы
    if (Object.keys(errors).length === 0) {
      // Обработка отправки формы
    }
  };

  const handleInfoClick = () => setShowInfo(!showInfo);
  const handleInfoClickTwo = () => setShowInfoTwo(!showInfoTwo);

  // клик для открытия выпадающего меню в выборе пола
  const handleOptionClick = (option) => {
    setGender(option.value);
    setIsOpen(false);
    setFormData({ ...formData, sex: option.value });
  };

  // подтверждение(правила школы)
  const handleRulesAcceptedChange = (event) => {
    setFormData({ ...formData, agreed_to_terms: event.target.checked });
  };

  // согалсие на обработку данных
  const handleRulesConsentChange = (event) => {
    setFormData({ ...formData, personal_data: event.target.checked });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form__block">
          <h1 className="form__title">Регистрация</h1>

          <div className="form__header">
            <h2 className="form__subtitle">Личные данные</h2>
            <div className="info" onClick={handleInfoClick}>
              <div className="info__icon">
                <Info />
              </div>

              {showInfo && (
                <p className="info__text">
                  Укажите данные, чтобы в дальнейшем мы могли комфортно общаться и подбирать тренировки
                </p>
              )}
            </div>
          </div>

          <div className="form__container">
            <label className="form__item form__input-name">
              <input
                type="text"
                name="first_name"
                placeholder="Имя *"
                onChange={handleInputChange}
                className="form__name"
                value={formData.first_name}
              />
              <div className={`error ${errors.first_name ? 'error_active' : ''}`}>{errors.first_name}</div>
            </label>

            <label className="form__item form__input-surname">
              <input
                type="text"
                name="last_name"
                placeholder="Фамилия *"
                onChange={handleInputChange}
                className="form__surname"
                value={formData.last_name}
              />
              <div className={`error ${errors.last_name ? 'error_active' : ''}`}>{errors.last_name}</div>
            </label>

            <label className="form__item form__input-birthdate">
              <Input
                type="text"
                name="birthday"
                placeholder="Дата рождения *"
                onChange={handleInputChange}
                className="form__birthdate"
                value={birthDayValue}
                inputComponent={BirthDayMask}
              />

              <div className={`error ${errors.birthday ? 'error_active' : ''}`}>{errors.birthday}</div>
            </label>

            <label className="form__item form__input-phone">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form__phone"
                placeholder="Телефон *"
              />
              <div className={`error ${errors.phone ? 'error_active' : ''}`}>{errors.phone}</div>
            </label>

            <label className="form__item form__input-email">
              <input
                type="email"
                name="email"
                placeholder="E-mail *"
                onChange={handleInputChange}
                className="form__email"
                value={formData.email}
              />
              <div className={`error ${errors.email ? 'error_active' : ''}`}>{errors.email}</div>
            </label>

            <div className="form__item gender-dropdown">
              <div className="gender-dropdown__selected" onClick={() => setIsOpen(!isOpen)}>
                {gender ? genders.find((option) => option.value === gender).label : 'Пол *'}

                <DropDownIcon />

                {/*<img className="gender-dropdown__icon" src={genderIcon} alt="icon" />*/}
              </div>
              {isOpen && (
                <div className="gender-dropdown__options">
                  {genders.map((option) => (
                    <div
                      key={option.value}
                      className={`gender-dropdown__option ${
                        gender === option.value ? 'gender-dropdown__option--selected' : ''
                      }`}
                      onClick={() => handleOptionClick(option)}
                      onChange={handleInputChange}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form__block">
          <div className="form__header">
            <h2 className="form__subtitle">Защита аккаунта</h2>

            <div className="info" onClick={handleInfoClickTwo}>
              <div className="info__icon">
                <Info />
              </div>

              {showInfoTwo && (
                <p className="info__text">
                  Укажите данные, чтобы в дальнейшем мы могли комфортно общаться и подбирать тренировки
                </p>
              )}
            </div>
          </div>
          <div className="form__container">
            <label className="form__item form__input-login">
              <input
                type="text"
                name="username"
                placeholder="Логин *"
                onChange={handleInputChange}
                className="form__login"
                value={formData.username}
              />
              <div className={`error ${errors.username ? 'error_active' : ''}`}>{errors.username}</div>
            </label>
            <label className="form__item form__input-password">
              <input
                type="password"
                name="password"
                placeholder="Пароль *"
                autoComplete="new-password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <div className={`error ${errors.password ? 'error_active' : ''}`}>{errors.password}</div>
            </label>
            <label className="form__item form__input-confirm">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Подтвердить пароль *"
                autoComplete="new-password"
                onChange={handleInputChange}
                value={formData.password_confirmation}
              />
              <div className={`error ${errors.password_confirmation ? 'error_active' : ''}`}>
                {errors.password_confirmation}
              </div>
            </label>
            <p className="form__info">Формы, обязательные к заполнению</p>
          </div>
        </div>

        <RulesBlock />

        <label className="form__accepted">
          <div className="form__accepted-content">
            <input
              className="form__accepted-input"
              type="checkbox"
              checked={formData.agreed_to_terms}
              onChange={handleRulesAcceptedChange}
            />

            <p className="form__accepted-text">
              Я ознакомился с <span>Правилами школы</span>
            </p>
          </div>

          {errors.agreed_to_terms && <div className="error error_active">{errors.agreed_to_terms}</div>}
        </label>

        {/*<div className="recapthca">*/}
        {/* <ReCAPTCHA
            sitekey="ВАШ_КЛЮЧ_RECAPTCHA"
            onChange={this.handleRecaptchaChange}
          /> */}
        {/*</div>*/}

        <div className="form__btn-block">
          <label className="form__consent">
            <input
              className="form__consent-input"
              type="checkbox"
              checked={formData.personal_data}
              onChange={handleRulesConsentChange}
            />

            <p className="form__consent-text">
              Нажимая на кнопку "Зарегистрироваться", Вы даете согласие на <span>обработку персональных данных</span>
            </p>
          </label>

          {errors.personal_data && <div className="error error_active">{errors.personal_data}</div>}

          <button className="form__btn" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
