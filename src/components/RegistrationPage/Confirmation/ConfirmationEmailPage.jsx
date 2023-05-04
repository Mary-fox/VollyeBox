import React, {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom'
import "./Confirmation.scss"
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Api from "../../Api/Api";

function ConfirmationEmailPage (props) {
  const { menu, icon} = props;
  const navigate = useNavigate()
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token'); 
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);
  
  function submitForm(event) {

    event.preventDefault(); // предотвращаем стандартное поведение формы
    const form = event.target; // получаем форму из события
    const formData = new FormData(form); // создаем объект FormData
  

    Api.post('api/v1/confirmation/', formData)
      .then(response => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        if (response.status === 201) {
          navigate('/')
        }

      })
      .catch((error) => {
        if (error.response.status === 400) {
          // Если есть ошибки валидации, отображаем их на странице
         setErrors("Неверный код");
        }
      });
  }
  // присваиваем функцию обработчика события submit формы
  const Form = () => {
    return (
      <div className="confirmation-page background">
        <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen}/>
        <main className='confirmation-page__content wrapper'>
          <h1 className='confirmation-page__title'>Регистрация</h1>
          <h2 className='confirmation-page__subtitle'>Подтверждение почты</h2>
          <form className="confirmation-form" onSubmit={submitForm}>
            <label  htmlFor="confirmation-email">На указанную почту было выслано письмо с кодом. Введите его в строке ниже</label>
            <input type="text" id="confirmation-email" name="confirmation_token" placeholder='Проверочный код из письма '/>
            <div className={`error ${errors? "error_active" : ""}`}>{errors}</div> 
            <button type="submit" className='confirmation-form__btn btn'>Подтвердить</button>
          </form>
        </main>
        <Footer menu={menu} icon={icon}/>
      </div>
    )
   }

   return <Form />;
 }
export default ConfirmationEmailPage;