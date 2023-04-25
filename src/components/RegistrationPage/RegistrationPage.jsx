import React from 'react';
import './RegistrationPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegistrationForm from './RegistrationForm/RegistrationForm';


function RegistrationPage ({menu, icon} ) {


  
  return (
    <div className='registration-page background'>
      <Header menu={menu} icon={icon}/>
        <main className='wrapper'>
          <RegistrationForm />
        </main>
      <Footer menu={menu} icon={icon}/>
    </div>
  );
};

export default RegistrationPage;