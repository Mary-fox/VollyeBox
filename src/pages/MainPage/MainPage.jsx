import React, { useState, useEffect } from 'react';

// Files
import './MainPage.scss';
import { api, apiHostName } from '../../constants/constants';

// Components
import Loader from '../../components/Loader/Loader';
import Statistics from '../../components/Statistics/Statistics';
import InfoBlock from './InfoBlock/InfoBlock';
import InfoCards from './InfoCards/InfoCards';
import MainSlider from '../../components/MainSlider/MainSlider';
import Review from '../../components/Review/Review';
import MyMap from '../../components/Map/MyMap';

const MainPage = () => {
  const [mainPageInfo, setMainPageInfo] = useState([]); // Main page info
  const [isLoader, setIsLoader] = useState(true); // Loader
  const [mainPageReviews, setMainPageReviews] = useState([]); // Main page reviews

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

    // Получение отзывов для страницы
    api
      .get('reviews/?limit=4&target=s')
      .then(({ data }) => setMainPageReviews(data.results))
      .catch((error) => console.error(error));
  }, []);

  // Вставляем видео файл, видео код или картинку
  if (mainPageInfo?.video_block?.video_file) {
    // controls добавляет элементы управления для <video>
    bannerContent = <video src={`${apiHostName}${mainPageInfo?.video_block?.video_file}`} autoPlay muted loop />;
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
                <div className="slider-block main-slider">
                  <h2 className="page-title">Галерея</h2>

                  <MainSlider slides={mainPageInfo.slides} />
                </div>
              </div>

              {/*** Reviews ***/}
              <div className="main-content__item">
                <h2 className="page-title">Отзывы</h2>

                <ul className="reviews">
                  {mainPageReviews.map((item) => {
                    if (item.is_published) {
                      return (
                        <li key={item.id} className="reviews__item">
                          <Review item={item} />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>

            {/*** Map ***/}
            <section className="map-section">
              <div className="container">
                <h2 className="page-title">контакты</h2>
              </div>

              <div className="map">
                <MyMap />
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;
