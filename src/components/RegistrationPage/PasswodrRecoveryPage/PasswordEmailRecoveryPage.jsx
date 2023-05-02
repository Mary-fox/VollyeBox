import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom'
import "./PasswordEmailRecoveryPage.scss"
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Api from "../../Api/Api";

function PasswordEmailRecoveryPage ({menu, icon}) {
  const navigate = useNavigate()
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  
  
  function submitForm(event) {

    event.preventDefault(); // предотвращаем стандартное поведение формы
    const form = event.target; // получаем форму из события
    const formData = new FormData(form); // создаем объект FormData
  

    Api.post('api/v1/reset-password/', formData) 
      .then(response => {
        // обработка успешного ответа
        if(response.data.email) {
          navigate('/recovery-password-email/newpassword/')
          // переход на страницу восстановления  по email(ввод нового пароля)
        } 
      })
      .catch(error => console.error(error));
  }
  // присваиваем функцию обработчика события submit формы
  const Form = () => {
    return (
      <div className="recovery-page background">
        <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen}/>
        <main className='recovery-page__content wrapper'>
          <h1 className='recovery-page__title'>Восстановление пароля</h1>
          <h2 className='recovery-page__subtitle'>забыли пароль?</h2>
          <form className="recovery-form" onSubmit={submitForm}>
            <label  htmlFor="recovery-email">Введите свой адрес электронной почты ниже, и мы вышлем Вам инструкцию, как установить новый пароль</label>
            <input type="text" id="recovery-email" name="email" placeholder='Адрес электронной почты'/>
            <button type="submit" className='recovery-form__btn'>восстановить мой пароль</button>
          </form>
        </main>
        <Footer menu={menu} icon={icon}/>
      </div>
    )
   }

   return <Form />;
 }
export default PasswordEmailRecoveryPage;