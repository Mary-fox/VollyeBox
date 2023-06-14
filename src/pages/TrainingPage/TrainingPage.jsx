import React, { useState, useEffect, useRef } from 'react';
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
import AngleDecorDouble from '../../components/IconComponents/AngleDecorDouble';
import AngleDecorSingle from '../../components/IconComponents/AngleDecorSingle';

const TrainingPage = () => {
  const selectTrainingBlk = useRef(null);
  const [trainingPreviewHeight, setTrainingPreviewHeight] = useState(0); // Set height for training preview

  const mobScreen = window.matchMedia('(max-width: 743px)'); // Mobile media query
  const descScreen = window.matchMedia('(min-width: 992px)'); // Mobile media query

  const [isMobScreen, setIsMobScreen] = useState(mobScreen.matches); // State for mobile screen
  const [isDescScreen, setIsDescScreen] = useState(mobScreen.matches); // State for mobile screen

  const [trainingList, setTrainingList] = useState([]);
  const [controlledTrainingInfo, setControlledTrainingInfo] = useState(null);
  const [controlledTrainingPreviewImg, setControlledTrainingPreviewImg] = useState(null);

  useEffect(() => {
    api
      .get('type-training/')
      .then(({ data }) => setTrainingList(data))
      .then(() => setTrainingPreviewHeight(selectTrainingBlk.current.clientHeight));

    const handleScreenChange = (event) => {
      setIsMobScreen(event.matches);
      setIsDescScreen(event.matches);
    };

    mobScreen.addEventListener('change', handleScreenChange);
    descScreen.addEventListener('change', handleScreenChange);

    return () => {
      mobScreen.removeEventListener('change', handleScreenChange);
      descScreen.removeEventListener('change', handleScreenChange);
    };
  }, []);

  useEffect(() => {
    setTrainingPreviewHeight(selectTrainingBlk.current.clientHeight);
  }, [isMobScreen, isDescScreen]);

  return (
    <>
      <div className="container">
        <h1 className="page-title">Виды тренировок</h1>

        <section className="select-training-wrapper">
          {/* Top left decor element */}
          <div className="select-training-wrapper__left-decor">
            <AngleDecorSingle />
          </div>

          <div className="select-training">
            {/* Slider buttons */}
            <Swiper
              className="select-training__list"
              ref={selectTrainingBlk}
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
                }
              })}
            </Swiper>

            {/* Slider image preview */}
            <Swiper
              className="select-training__preview"
              style={{ height: trainingPreviewHeight }}
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
                      <img src={`${apiHostName}${image_mob}`} alt={title} />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>

          {/* Bottom right decor element */}
          <div className="select-training-wrapper__right-decor">
            <AngleDecorDouble />
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
                        {trainingInfo &&
                          trainingInfo.map((item, index) => {
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
              }
            })}
          </Swiper>
        </section>
      </div>
    </>
  );
};

export default TrainingPage;
