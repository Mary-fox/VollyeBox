import React, {useState, useEffect} from 'react';
import './MainPage.scss';
import Header from '../Header/Header';
import InfoBlock from './InfoBlock/InfoBlock';
import InfoCard from './InfoCard/InfoCard';
import SliderBlock from './SliderBlock/SliderBlock';
import Reviews from '../Reviews/Reviews';
import MyMap from '../Map/MyMap';
import Footer from '../Footer/Footer';
import Statistics from './Statistics/Statistics';
import Api from '../Api/Api';


function MainPage ( ) {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    Api.get('api/v1/home-block/')
    .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);
  const foundBlocks = data.find(item => item.slug === "home_main_banner");


  useEffect(() => {
    Api.get('api/v1/menu/')
      .then(response => setMenu(response.data));
  }, []);  //для меню
  

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.matchMedia("(max-width: 600px)").matches
  );
  // window.matchMedia("(max-width: 600px)") возвращает объект MediaQueryList, который представляет состояние соответствия медиазапроса, а свойство matches возвращает текущее состояние соответствия медиазапроса
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  return (
    <>
    <div className='background-wrapper'>
      <Header menu={menu}/>
        <div className='main-page__title-image'>
          {isSmallScreen ?( foundBlocks && (<img  src={`https://merlinsbeard.ru/${foundBlocks.image_mob}`} alt="main-mobile" />)) : (  foundBlocks && ( <img  src={`https://merlinsbeard.ru/${foundBlocks.image}`}  alt="main"/>))}  
        </div>
        <div className="main-page__content wrapper">
          <Statistics />
        </div>
    </div>
    <main className='main-page'>
      <div className="main-page__content wrapper">
        <InfoBlock  data={data} />
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
        <Reviews />
      </div>
      <div className='map'>
        <MyMap />
      </div>
    </main>
    <Footer menu={menu}/>
    
    </>
  );
};

export default MainPage;