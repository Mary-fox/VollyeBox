import React, { useState, useEffect } from 'react';

// Files
import './MainPage.scss';
import { api, apiHostName } from '../../constants/constants';

// Components
import Loader from '../../components/Loader/Loader';
import Statistics from '../../components/Statistics/Statistics';
import InfoBlock from './InfoBlock/InfoBlock';
import InfoCards from './InfoCards/InfoCards';
import SliderBlock from './SliderBlock/SliderBlock';
import Reviews from '../../components/Reviews/Reviews';
import MyMap from '../../components/Map/MyMap';

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
          {/*** Main banner ***/}
          <div className="main-banner media-wrapper">{bannerContent}</div>

          <div className="main-content">
            <div className="container">
              {/*** Statistic ***/}
              <div className="main-content__item">
                <Statistics />
              </div>

              {/*** Info block ***/}
              <div className="main-content__item">
                <InfoBlock data={mainPageInfo} />
              </div>

              {/*** Info cards ***/}
              <div className="main-content__item">
                <InfoCards data={mainPageInfo} />
              </div>

              {/*** Slider ***/}
              <div className="main-content__item">
                <SliderBlock data={mainPageInfo} />
              </div>

              {/*** Reviews ***/}
              <div className="main-content__item">
                <Reviews />
              </div>
            </div>

            {/*** Map ***/}
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
