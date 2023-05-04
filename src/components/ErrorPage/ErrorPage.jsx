import React, {useState} from 'react';
import './ErrorPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


function ErrorPage({menu, icon}) {
const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);

  return (
    <div className='error-page background'>
      <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen}/>
      <section className='error-page__content wrapper'>
        <h1 className='error-page__title'>Упс...</h1>
        <h2 className='error-page__subtitle'>Такой страницы не существует </h2>
        <p className='error-page__text'>Произошла ошибка, вернитесь на главную страницу</p>
        <Link className='error-page__btn btn' to="/">На главную</Link>
      </section>
      
      <Footer menu={menu} icon={icon}/>
    </div>
    )
    
  };

export default ErrorPage;

