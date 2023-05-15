import React, { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Files
import './TrainersPage.scss';
import { api } from '../../constants/constants';

// Components
import TopCardsPreviewSlider from '../../components/TopCardsPreviewSlider/TopCardsPreviewSlider';
import SliderThumbsBottom from '../../components/SliderThumbsBottom/SliderThumbsBottom';
import Rating from '../../components/Rating/Rating';
import Review from '../../components/Review/Review';
import MyMap from '../../components/Map/MyMap';

// Context
export const SetTrainerIdContext = createContext({});

const TrainersPage = () => {
  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle

  // Trainers
  const [trainersList, setTrainersList] = useState([]); // Top slider with all trainers
  const [activeTrainerId, setActiveTrainerId] = useState(null); // Selected trainer id
  const [activeTrainer, setActiveTrainer] = useState([]); // Selected trainer data
  const [activeTrainerSlides, setActiveTrainerSlides] = useState([]); // Selected trainer slides
  const [activeTrainerReviews, setActiveTrainerReviews] = useState([]); // Selected trainer reviews

  // Get default page info and trainers data on page load
  useEffect(() => {
    // Set page info
    api.get('dynamic-page/trainers/').then(({ data }) => {
      const pageInfo = {
        title: data.title,
        description: data.blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    // Set trainers data
    api.get('trainers/').then(({ data }) => {
      setTrainersList(data); // Set trainers list
      setActiveTrainerId(data[0].id); // Set the first active trainer id
    });
  }, []);

  // Change trainer
  useEffect(() => {
    if (activeTrainerId) {
      api.get(`trainers/${activeTrainerId}/`).then(({ data }) => {
        setActiveTrainer(data); // Set trainer data
        setActiveTrainerSlides(data.trainer_slides); // Set active trainer slides
        setActiveTrainerReviews(data.trainer_reviews); // Set active trainer reviews
      });
    }
  }, [activeTrainerId]);

  return (
    <SetTrainerIdContext.Provider value={{ setActiveTrainerId }}>
      <div className="container">
        <h1 className="page-title">{pageInfo.title}</h1>
        <p className="page-subtitle">{pageInfo.description}</p>

        {/*** Top cards preview slider ***/}
        <section className="trainer-types">
          <TopCardsPreviewSlider data={trainersList} />
        </section>

        {/*** Active trainer info ***/}
        <section className="trainer">
          <div className="trainer__images">
            <SliderThumbsBottom slides={activeTrainerSlides} />
          </div>

          <div className="trainer__title">
            <p className="details-title">{`${activeTrainer.last_name} ${activeTrainer.first_name}`}</p>

            <div className="trainer__rating">
              <Rating item={activeTrainer} />
            </div>
          </div>

          <div className="trainer__info-block experience">
            <span className="trainer__info-block-title">Игровой опыт</span>
            <p className="trainer__info-block-description">
              {activeTrainer?.user?.experience ? `${activeTrainer?.user?.experience} лет` : 'Не указано'}
            </p>
          </div>

          <div className="trainer__info-block about">
            <span className="trainer__info-block-title">О себе</span>
            <p className="trainer__info-block-description">
              {activeTrainer?.user?.about ? activeTrainer?.user?.about : 'Не указано'}
            </p>
          </div>

          <div className="trainer__info-block achievements">
            <span className="trainer__info-block-title">Достижения</span>

            {activeTrainer?.user?.achievements.length > 0 ? (
              <ul className="trainer__info-block-description trainer__info-block-description--list">
                {activeTrainer?.user?.achievements.map(({ id, title }) => {
                  return <li key={id}>{title}</li>;
                })}
              </ul>
            ) : (
              <p className="trainer__info-block-description">Не указано</p>
            )}
          </div>

          <Link to="/schedule" className="btn btn--bg trainer__schedule">
            К расписанию
          </Link>
        </section>

        {/*** Trainer reviews ***/}
        {activeTrainerReviews.length > 0 && (
          <section className="trainer-reviews">
            <ul className="reviews">
              {activeTrainerReviews.map((item) => {
                if (item.is_published) {
                  return (
                    <li key={item.id} className="reviews__item">
                      <Review item={item} />
                    </li>
                  );
                }
              })}
            </ul>
          </section>
        )}
      </div>

      {/*** Trainers page map ***/}
      <section className="trainer-map map">
        <MyMap />
      </section>
    </SetTrainerIdContext.Provider>
  );
};

export default TrainersPage;
