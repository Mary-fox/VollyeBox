import React, { useState, useEffect } from 'react';
import { api } from '../../constants/constants';
import './MainPage.scss';
import InfoBlock from './InfoBlock/InfoBlock';
import SliderBlock from './SliderBlock/SliderBlock';
import Reviews from '../Reviews/Reviews';
import MyMap from '../Map/MyMap';
import Statistics from './Statistics/Statistics';
import InfoCards from './InfoCards/InfoCards';
import myGif from '../../assets/images/Frame.gif';

function MainPage() {
  const [data, setData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.matchMedia('(max-width: 600px)').matches);
  // window.matchMedia("(max-width: 600px)") возвращает объект MediaQueryList, который представляет состояние соответствия медиазапроса, а свойство matches возвращает текущее состояние соответствия медиазапроса
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener('change', handleScreenChange);
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  useEffect(() => {
    api
      .get('dynamic-page/main/')
      .then(({ data }) => {
        // setData(response.data[0]);
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (data.blocks) {
    // const foundBlocks = data.blocks.find((item) => item.slug === 'home_main_banner');
    const foundBlocks = data?.video_block?.image;

    return (
      <>
        <div className="main-page__title-image">
          {isSmallScreen ? (
            <img src={`https://merlinsbeard.ru/${data?.video_block?.image_mob}`} alt="main-mobile" />
          ) : (
            <img src={`https://merlinsbeard.ru/${foundBlocks}`} alt="main" />
          )}
        </div>

        <div className="main-page__content wrapper">
          <Statistics />
        </div>

        <div className="main-page">
          <div className="main-page__content wrapper">
            <InfoBlock data={data} />
            <InfoCards data={data} />
            <SliderBlock data={data} />
            <Reviews />
          </div>

          <div className="map">
            <MyMap />
          </div>
        </div>

        {/*<Footer menu={menu} icon={icon} />*/}
      </>
    );
  } else {
    return (
      <div className="loader">
        <img src={myGif} alt="gif" />
      </div>
    );
  }
}

export default MainPage;
