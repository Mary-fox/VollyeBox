import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom'
import "./PasswordEmailRecoveryPage.scss"
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Api from "../../Api/Api";

function PasswordEmailRecoveryPage (props) {
  const {isAuthenticated, setIsAuthenticated, menu, icon} = props;
  const navigate = useNavigate()
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    confirmation_token:'',
    password: '',
    password_confirmation: '',
    errors:{}
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value})
    setErrors({...errors, [name]: ''});
    
  };

  function submitForm(event) {

    event.preventDefault(); // предотвращаем стандартное поведение формы
  
  

    Api.patch('api/v1/reset-password/new-password/', formData)
      .then(response => {
        localStorage.setItem("access_token", response.data.access);
        console.log(response.data)
        localStorage.setItem("refresh_token", response.data.refresh);
        if (response.status === 201) {
          navigate('/')
        }

      })
      .catch((error) => {
        if (error.response.status === 400) {
          // Если есть ошибки валидации, отображаем их на странице
         setErrors(error.response.data);
        }
        if (error.response.status === 404) {
          // Если есть ошибки валидации, отображаем их на странице
          setErrors({...errors, confirmation_token: "некорректный код"})
        }
      });
    }

  // присваиваем функцию обработчика события submit формы

    return (
      <div className="recovery-page background">
        <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <main className='recovery-page__content wrapper'>
          <h1 className='recovery-page__title'>Восстановление пароля</h1>
          <form className="password-form" onSubmit={submitForm}>
            <label>
              <input type="text"  name="confirmation_token" placeholder='Проверочный код из письма '  value={formData.confirmation_token} onChange={handleInputChange}/>
              <div className={`error ${errors.confirmation_token? "error_active" : ""}`}>{errors.confirmation_token}</div> 
            </label>
            <label>
              <input type="password" name="password" placeholder="Пароль*" autoComplete="new-password" onChange={handleInputChange}
                                                value={formData.password} />
            < div className={`error ${errors.password? "error_active" : ""}`}>{errors.password}</div> 
            </label>
            <label>
              <input type="password" name="password_confirmation" placeholder="Подтвердить пароль*" autoComplete="new-password" onChange={handleInputChange}
                                                value={formData.password_confirmation} />
              <div className={`error ${errors.password_confirmation? "error_active" : ""}`}>{errors.password_confirmation}</div> 
            </label>
            <button type="submit" className='recovery-form__btn'>Подтвердить</button>
          </form>
        </main>
        <Footer menu={menu} icon={icon}/>
      </div>
    )
   }


export default PasswordEmailRecoveryPage;