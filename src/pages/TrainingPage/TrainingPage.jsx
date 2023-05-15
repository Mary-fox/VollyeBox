import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Controller, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Files
import './TrainingPage.scss';
import { apiHostName, api } from '../../constants/constants';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function TrainingPage({ menu, icon }) {
  const [trainingList, setTrainingList] = useState([]);
  const [controlledTrainingInfo, setControlledTrainingInfo] = useState(null);
  const [controlledTrainingPreviewImg, setControlledTrainingPreviewImg] = useState(null);

  useEffect(() => {
    api.get('type-training/').then(({ data }) => setTrainingList(data));
  }, []);

  return (
    <div className="training-page background">
      <Header menu={menu} icon={icon} />

      <main className="container">
        <h1 className="page-title">Виды тренировок</h1>

        <section className="select-training-wrapper">
          {/* Top left decor element */}
          <div className="select-training-wrapper__left-decor">
            <svg width="182" height="89" viewBox="0 0 182 89" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H170L182 16.3774H15V88.8351L0 77.9169V0Z" fill="currentColor" />
            </svg>
          </div>

          <div className="select-training">
            {/* Slider buttons */}
            <Swiper
              className="select-training__list"
              slidesPerView={1}
              modules={[Pagination, Controller]}
              controller={{ control: [controlledTrainingInfo, controlledTrainingPreviewImg] }}
              pagination={{ clickable: true }}
              onSlideChange={() => {}}
              onSwiper={(swiper) => {}}
            >
              {trainingList.map(({ id, title, is_published }) => {
                if (is_published) {
                  return (
                    <SwiperSlide key={id} className="select-training__list-item">
                      <p>{title}</p>
                    </SwiperSlide>
                  );
                } else {
                  return false;
                }
              })}
            </Swiper>

            {/* Slider image preview */}
            <Swiper
              className="select-training__preview"
              slidesPerView={1}
              effect={'fade'}
              allowTouchMove={false}
              modules={[Controller, EffectFade]}
              onSlideChange={() => {}}
              onSwiper={setControlledTrainingPreviewImg}
            >
              {trainingList.map(({ id, title, image_mob, is_published }) => {
                if (is_published) {
                  return (
                    <SwiperSlide key={id} className="">
                      <img src={`${apiHostName}${image_mob}`} alt={title} />;
                    </SwiperSlide>
                  );
                } else {
                  return false;
                }
              })}
            </Swiper>
          </div>

          {/* Bottom right decor element */}
          <div className="select-training-wrapper__right-decor">
            <svg width="250" height="246" viewBox="0 0 250 246" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M233 121.926L232 8.77292L241 0.33606V90.6601L249.134 99.0608L248.699 140.047L237 151.207L221.5 155.177L154.5 223.168V235.576L144 245.005L100.5 245.005L97.5 238.553H0L11.5 229.124H124L233 121.926Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>

        <section className="training-info-section">
          <Swiper
            className="training-slider"
            slidesPerView={1}
            direction={'vertical'}
            allowTouchMove={false}
            modules={[Controller]}
            onSlideChange={() => {}}
            onSwiper={setControlledTrainingInfo}
          >
            {trainingList.map(({ id, title, description, image, is_published }) => {
              const trainingDescriptionBlock = JSON.parse(description).blocks;
              const trainingSubtitle = trainingDescriptionBlock[0].data.text;
              const trainingInfo = trainingDescriptionBlock[1].data.content;

              if (is_published) {
                return (
                  <SwiperSlide key={id} className="training-slider__item">
                    <div className="training">
                      <div className="training__image">
                        <img src={`${apiHostName}${image}`} alt={title} />
                      </div>

                      <p className="training__title details-title">{title}</p>
                      <p className="training__subtitle">{trainingSubtitle}</p>

                      <ul className="training__info details-list">
                        {trainingInfo.map((item, index) => {
                          return (
                            <li key={index} className="details-list__item">
                              <p className="details-list__item-text">
                                <span className="details-list__item-text-title">{item[0]}</span>
                                <span className="details-list__item-text-value">{item[1]}</span>
                              </p>
                            </li>
                          );
                        })}
                      </ul>

                      <Link to="/schedule" className="btn btn--bg training__schedule">
                        К расписанию
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              } else {
                return false;
              }
            })}
          </Swiper>
        </section>
      </main>

      <Footer menu={menu} icon={icon} />
    </div>
  );
}

export default TrainingPage;
