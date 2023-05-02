import React, { useState} from 'react';
import './PrivacyPolicyPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';



function PrivacyPolicyPage({menu, icon} ) {
    const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);

    return (
      <div className='privacy-page background'>
      <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen}/>
  
      <section className='wrapper'>
        <h1>Политика конфиденциальности</h1>
      </section>
      <Footer menu={menu} icon={icon}/>
      </div>
    );
  };
  
  
  export default PrivacyPolicyPage;
  

