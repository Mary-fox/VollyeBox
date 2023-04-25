import React, { useState } from 'react';
import './RegistrationForm.scss';
import info from '../../../assets/icon/info-circle.svg';
import genderIcon from '../../../assets/icon/form-icon.svg';
import RulesBlock from '../RulesBlock/RulesBlock';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState('');
  const [errors, setErrors] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoTwo, setShowInfoTwo] = useState(false);
  const genders = ["Мужской", "Женский"];
  const [rulesAccepted, setRulesAccepted] = useState(false); //правила школы
  const [rulesConsent, setRulesConsent] = useState(false); //согалсие на обработку данных

  const handleSubmit = (event) => {
    event.preventDefault();

    // Валидация полей формы
    const errors = {};
    if (!name.trim()) {
        errors.name = 'Поле обязательно для заполнения';
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
    if (!gender) {
        errors.gender = 'Поле обязательно для заполнения';
    }
    if (!password.trim()) {
      errors.password = 'Поле обязательно для заполнения';
    } else if (password.length < 6) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    if (rulesAccepted) {
        // отправка формы
    } else {
        alert("Для отправки формы необходимо принять правила");
    }
    if (rulesConsent) {
      // отправка формы
  } else {
      alert("Для отправки формы необходимо дасть согласие на обработку персональных данных");
  }
   

    // Обновление состояния ошибок валидации
    setErrors(errors);

    // Если ошибок нет, отправка формы
    if (Object.keys(errors).length === 0) {
      // Обработка отправки формы
    }
  };

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };
  const handleInfoClickTwo = () => {
    setShowInfoTwo(!showInfoTwo);
  };
  const handleOptionClick = (option) => {
    setGender(option);
    setIsOpen(false);
    errors.gender = ('');
  }; //клик для открытия выпадающего меню в выборе пола

  const handleRulesAcceptedChange = () => {
    setRulesAccepted(!rulesAccepted);
  };//подтверждение(правила школы)
  const handleRulesConsentChange = () => {
    setRulesConsent(!rulesConsent);
  };//согалсие на обработку данных

  return (<>
    <form className='form' onSubmit={handleSubmit}>
        <div className="form__block">
          <h1 className='form__title'>Регистрация</h1>
            <div className="form__header">
                <h2 className='form__subtitle'>Личные данные</h2>
                <div className="info" onMouseEnter={handleInfoClick} onMouseLeave={handleInfoClick}>
                <img className="info__icon" src={info} alt="info-icon" />
                {showInfo && <p className="info__text">Укажите данные, чтобы в дальнейшем мы могли комфортно общаться и подбирать тренировки</p>}
                </div>
            </div>
            <div className='form__container'>
                <label className="form__item form__input-name">
                    <input type="text" name="name" placeholder="Имя*" onInput={(evt) => {
                                            setName(evt.target.value) 
                                            errors.name = ('')}}
                                            className="form__name"  value={name} />
                                        <div className={`error ${errors.name ? "error_active" : ""}`}>{errors.name}</div> 
                </label>
                <label className="form__item form__input-surname">
                    <input type="text" name="surname" placeholder="Фамилия" onInput={(evt) => {
                                            setSurName(evt.target.value) 
                                            errors.surname = ('')}}
                                            className="form__surname" value={surname} />
                </label>
                <label className="form__item form__input-birthdate">
                    <input type="text" name="birthdate" placeholder="Дата рождения" onInput={(evt) => {
                                            setBirthdate(evt.target.value) 
                                            errors.birthdate = ('')}}
                                            className="form__birthdate"  value={birthdate} />
                </label>
                <label className="form__item form__input-phone">
                    <input  type="tel" name="phone" value={phone}   onInput={(evt) => {
                                            setPhone(evt.target.value) 
                                            errors.phone = ('')}}
                                        className="form__phone"
                                        placeholder="Телефон*"/>
                                        <div className={`error ${errors.phone ? "error_active" : ""}`}>{errors.phone}</div> 
                </label>
                <label className="form__item form__input-email">
                    <input type="email" name="birthdate" placeholder="E-mail*" onInput={(evt) => {
                                            setEmail(evt.target.value) 
                                            errors.email = ('')}}
                                            className="form__email"  value={email} />
                                        <div className={`error ${errors.email ? "error_active" : ""}`}>{errors.email}</div> 
                </label>
                <div className="form__item gender-dropdown">
                    <div className="gender-dropdown__selected" onClick={() => setIsOpen(!isOpen)}>
                        {gender || "Пол*"}
                        <img className="gender-dropdown__icon" src={genderIcon} alt="icon" />
                    </div>
                    <div className={`error ${errors.gender ? "error_active" : ""}`}>{errors.gender}</div> 
                    {isOpen && (
                        <div className="gender-dropdown__options">
                            {genders.map((option) => (
                          <div
                            key={option}
                            className={`gender-dropdown__option ${gender === option ? "gender-dropdown__option--selected" : ""}`}
                            onClick={() => handleOptionClick(option)}>
                            {option}
                          </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="form__block">
            <div className="form__header">
                <h2 className='form__subtitle'>Защита аккаунта</h2>
                <div className="info" onMouseEnter={handleInfoClickTwo} onMouseLeave={handleInfoClickTwo}>
                <img className="info__icon" src={info} alt="info-icon" />
                {showInfoTwo && <p className="info__text">Укажите данные, чтобы в дальнейшем мы могли комфортно общаться и подбирать тренировки</p>}
                </div>
            </div>
            <div className='form__container'>
                <label className="form__item form__input-login">
                        <input type="text" name="login" placeholder="Логин" onInput={(evt) => {
                                                setLogin(evt.target.value)}}
                                                className="form__login"  value={login} />
                </label>
                <label className="form__item form__input-password">
                        <input type="password" name="password" placeholder="Пароль*" onInput={(evt) => {
                                                setPassword(evt.target.value) 
                                                errors.password = ('')}}
                                                value={password} />
                                            <div className={`error ${errors.password? "error_active" : ""}`}>{errors.password}</div> 
                </label>
                <label className="form__item form__input-confirm">
                        <input type="password" name="confirmPassword" placeholder="Подтвердить пароль*" onInput={(evt) => {
                                                setConfirmPassword(evt.target.value) 
                                                errors.confirmPassword = ('')}}
                                                value={confirmPassword} />
                                            <div className={`error ${errors.confirmPassword? "error_active" : ""}`}>{errors.confirmPassword}</div> 
                </label>
                <p className='form__info'>Формы, обязательные к заполнению</p>
            </div>
        </div>
        <RulesBlock />
        <label className='form__accepted'>
            <input className='form__accepted-input'
            type="checkbox"
            checked={rulesAccepted}
            onChange={handleRulesAcceptedChange}
            />
            <p className='form__accepted-text'>Я ознакомился с <span>Правилами школы</span></p>
        </label>
        

    <button className='form__btn' type="submit">Зарегистрироваться</button>
    <label className='form__consent'>
            <input className='form__consent-input'
            type="checkbox"
            checked={rulesConsent}
            onChange={handleRulesConsentChange}
            />
            <p className='form__consent-text'>Нажимая на кнопку "Зарегистрироваться", Вы даете согласие на <span>обработку персональных данных</span></p>
      </label>
    </form>
    </>

   
  )
}
export default RegistrationForm;