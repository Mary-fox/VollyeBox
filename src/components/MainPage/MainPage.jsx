import React, { useState, useEffect } from 'react';

// Files
import './MainPage.scss';
import { api, apiHostName } from '../../constants/constants';

// Components
import InfoBlock from './InfoBlock/InfoBlock';
import SliderBlock from './SliderBlock/SliderBlock';
import Reviews from '../Reviews/Reviews';
import MyMap from '../Map/MyMap';
import Statistics from '../Statistics/Statistics';
import InfoCards from './InfoCards/InfoCards';
import Loader from '../Loader/Loader';

function MainPage() {
  const [mainPageInfo, setMainPageInfo] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 600px)').matches);
  // window.matchMedia("(max-width: 600px)") возвращает объект MediaQueryList, который представляет состояние соответствия медиазапроса, а свойство matches возвращает текущее состояние соответствия медиазапроса
  let bannerContent; // Переменная для банера

  useEffect(() => {
    // Получение данных страницы
    api
      .get('dynamic-page/main/')
      .then(({ data }) => {
        setMainPageInfo(data);

        setTimeout(() => setIsLoader(false), 2400);
      })
      .catch((error) => console.error(error));

    // mediaQuery
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener('change', handleScreenChange);
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  // Вставляем видео файл, видео код или картинку
  if (mainPageInfo?.video_block?.video_file) {
    bannerContent = (
      <video src={`${apiHostName}${mainPageInfo?.video_block?.video_file}`} autoPlay muted controls loop />
    );
  } else if (mainPageInfo?.video_block?.video_code) {
    bannerContent = (
      <iframe
        src={mainPageInfo?.video_block?.video_code}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  } else {
    bannerContent = <img src={`https://merlinsbeard.ru/${mainPageInfo?.video_block?.image}`} alt="main" />;
  }

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <div className="main-banner media-wrapper">{bannerContent}</div>

          <div className="main-content">
            <div className="container">
              <div className="main-content__item">
                <Statistics />
              </div>

              <div className="main-content__item">
                <InfoBlock data={mainPageInfo} />
              </div>

              <div className="main-content__item">
                <InfoCards data={mainPageInfo} />
              </div>

              <div className="main-content__item">
                <SliderBlock data={mainPageInfo} />
              </div>

              <div className="main-content__item">
                <Reviews />
              </div>
            </div>

            <div className="map">
              <MyMap />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MainPage;
