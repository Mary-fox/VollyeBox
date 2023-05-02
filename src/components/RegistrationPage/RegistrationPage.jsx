import React,{useState} from 'react';
import './RegistrationPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegistrationForm from './RegistrationForm/RegistrationForm';


function RegistrationPage ( props ) {
  const {isAuthenticated, setIsAuthenticated, menu, icon} = props;
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  return (
    <div className='registration-page background'>
      <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> 
        <main className='wrapper'>
          <RegistrationForm />
        </main>
      <Footer menu={menu} icon={icon}/>
    </div>
  );
};

export default RegistrationPage;