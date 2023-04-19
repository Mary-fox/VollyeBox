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
  useEffect(() => {
    Api.get('api/v1/home-block/')
    .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);
  console.log(data)
  const foundBlocks = data.find(item => item.slug === "home_main_banner");


  console.log(foundBlocks)
  
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
    <Header />
    <main className='main-page'>
      <div className='main-page__title-image'>
      {isSmallScreen ?(<img  src={require("../../assets/images/main-image-mobile.jpg")} alt="project" />) : (  foundBlocks && ( <img  src={`https://merlinsbeard.ru/${foundBlocks.image}`}  alt="main"/>))}  
      </div>
      <div className="main-page__content wrapper">
        <Statistics />
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
    <Footer />
    </>
  );
};

export default MainPage;