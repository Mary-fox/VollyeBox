import React, { useState } from 'react';
import './RegistrationPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegistrationForm from './RegistrationForm/RegistrationForm';

function RegistrationPage() {
  // const { menu, icon } = props;
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  return (
    <div className="registration-page wrapper">
      {/*<Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen} /> */}
      {/*<main className="wrapper">*/}
      {/*  asd*/}
      <RegistrationForm />
      {/*</main>*/}
      {/*<Footer menu={menu} icon={icon}/>*/}
    </div>
  );
}

export default RegistrationPage;
