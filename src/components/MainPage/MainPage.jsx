import React from 'react';
import './MainPage.scss';
import Header from '../Header/Header';
import InfoBlock from './InfoBlock/InfoBlock';
import InfoCard from './InfoCard/InfoCard';
import SliderBlock from './SliderBlock/SliderBlock';


function MainPage ( ) {
  return (
    <>
    <Header />
    <main className='main-page'>
      <div className='main-page__title-image'>
        <img  src={require("../../assets/images/main-image.jpg")} alt="main"/>
      </div>
      <div className="main-page__content wrapper">
        <InfoBlock />
        <div className="main-page__card-block">
          <InfoCard 
            backgroundStyle="coach"
            title="Тренера"
            btn="Подробнее"/>
          <InfoCard 
            backgroundStyle="halls"
            title="Залы"
            btn="Подробнее"/>
        </div>
        <SliderBlock />
      </div>
    </main>
    </>
  );
};

export default MainPage;