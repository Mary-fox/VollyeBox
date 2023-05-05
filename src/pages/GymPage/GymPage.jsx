import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Files
import './GymPage.scss';
import Api from '../../components/Api/Api';
import { gymTypesSliderOptions } from './sliderOptions';
import { apiHostName } from '../../constants/constants';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GymPage = ({ menu, icon }) => {
  const [pageInfo, setPageInfo] = useState({});
  const [gymList, seGymList] = useState([]);
  const [activeGym, setActiveGym] = useState(1);
  const [gymInfo, setGymInfo] = useState([]);

  useEffect(() => {
    Api.get('api/v1/dynamic-page/?slug=gym').then(({ data }) => {
      const pageInfo = {
        title: data[0].title,
        description: data[0].blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    Api.get('api/v1/gym/').then(({ data }) => {
      seGymList(data);
      // console.log(data, 'gymList');
    });
  }, []);

  useEffect(() => {
    Api.get(`api/v1/gym/${activeGym}/`).then(({ data }) => {
      setGymInfo(data);
      // console.log(data, 'activeGym');
    });
  }, [activeGym]);

  return (
    <div className="gym-page background">
      <Header menu={menu} icon={icon} />

      <main className="container">
        <h1 className="page-title">{pageInfo.title}</h1>
        <p className="page-subtitle">{pageInfo.description}</p>

        <section className="gym-types">
          <Swiper
            className="gym-types__list"
            {...gymTypesSliderOptions}
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {gymList.map(({ id, name, image, is_published }) => {
              if (is_published) {
                return (
                  <SwiperSlide key={id} className="gym-types__list-item">
                    <div className="gym-preview-wrapper">
                      {/* Top decor element */}
                      <div className="gym-preview-wrapper__top-decor">
                        <svg
                          width="182"
                          height="89"
                          viewBox="0 0 182 89"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0H170L182 16.3774H15V88.8351L0 77.9169V0Z" fill="#72BF44" />
                        </svg>
                      </div>

                      {/* Slide preview */}
                      <div className="gym-preview">
                        <img src={`${apiHostName}${image}`} className="gym-preview__image" alt={name} />

                        <div className="gym-preview__content">
                          <p className="gym-preview__content-title">{name}</p>
                          <button className="btn btn--bg gym-preview__content-button">подробнее</button>
                        </div>
                      </div>

                      {/* Bottom decor element */}
                      <div className="gym-preview-wrapper__bottom-decor">
                        <svg
                          width="250"
                          height="246"
                          viewBox="0 0 250 246"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M233 121.926L232 8.77292L241 0.33606V90.6601L249.134 99.0608L248.699 140.047L237 151.207L221.5 155.177L154.5 223.168V235.576L144 245.005L100.5 245.005L97.5 238.553H0L11.5 229.124H124L233 121.926Z"
                            fill="#72BF44"
                          />
                        </svg>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              } else {
                return false;
              }
            })}
          </Swiper>
        </section>

        <section className="gym-info"></section>

        <section className="gym-map"></section>
      </main>

      <Footer menu={menu} icon={icon} />
    </div>
  );
};

export default GymPage;
