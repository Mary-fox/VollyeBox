import React, { createContext, useEffect, useState } from 'react';

// Files
import './TrainersPage.scss';
import Api from '../../components/Api/Api';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TopCardsPreviewSlider from '../../components/TopCardsPreviewSlider/TopCardsPreviewSlider';
import SliderThumbsBottom from '../../components/SliderThumbsBottom/SliderThumbsBottom';
// import Rating from '../../components/Rating/Rating';
// import TabNavigationSlider from '../../components/TabNavigationSlider/TabNavigationSlider';
import { Link } from 'react-router-dom';

// Context
export const SetTrainerIdContext = createContext({});

const TrainersPage = ({ menu, icon }) => {
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
    Api.get('api/v1/dynamic-page/?slug=trainers').then(({ data }) => {
      const pageInfo = {
        title: data[0].title,
        description: data[0].blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    // Set trainers data
    Api.get('api/v1/trainers/').then(({ data }) => {
      // console.log(data, 'trainers data');

      setTrainersList(data); // Set trainers list
      setActiveTrainerId(data[0].id); // Set the first active trainer id

      // console.log(trainersList, 'trainersList');
      // console.log(activeTrainerId, 'activeTrainerId');
    });
  }, []);

  // Change trainer
  useEffect(() => {
    if (activeTrainerId) {
      Api.get(`api/v1/trainers/${activeTrainerId}/`).then(({ data }) => {
        // console.log(data, 'trainer data');
        // console.log(activeTrainerId, 'activeTrainerId');
        // Parse content for the first tab in details of active trainer
        // const defaultTabContent = data.blocks[0]?.style_content && JSON.parse(data.blocks[0]?.style_content);
        // const defaultTabNav = data.blocks[0]?.id; // Gey the first active tab of active trainer by default

        setActiveTrainer(data); // Set trainer data
        setActiveTrainerSlides(data.trainer_slides); // Set active trainer slides
        setActiveTrainerReviews(data.trainer_reviews); // Set active trainer reviews

        // setDetails(data.blocks); // Set all details of the trainer (all tabs content)
        // setDetailsNavigationId(defaultTabNav); // Set the first active tab navigation
        // setDetailsContent(defaultTabContent?.blocks[0]?.data?.content); // Set the first tab content
      });
    }
  }, [activeTrainerId]);

  return (
    <SetTrainerIdContext.Provider value={{ setActiveTrainerId }}>
      <div className="trainers-page background">
        <Header menu={menu} icon={icon} />

        <main>
          <div className="container">
            <h1 className="page-title">{pageInfo.title}</h1>
            <p className="page-subtitle">{pageInfo.description}</p>

            {/* Top cards preview slider */}
            <section className="trainer-types">
              <TopCardsPreviewSlider data={trainersList} />
            </section>

            {/* Active trainer info */}
            <section className="trainer">
              <div className="trainer__images">
                <SliderThumbsBottom slides={activeTrainerSlides} />
              </div>

              <div className="trainer__title">
                {/*<p className="details-title">{activeGym.name}</p>*/}

                <div className="trainer__rating">{/*<Rating item={activeGym} />*/}</div>
              </div>

              <div className="trainer__info">
                <div className="trainer__info-navigation">
                  {/* Details navigation slider */}
                  {/*<TabNavigationSlider data={details} />*/}
                </div>

                <ul className="trainer__info-content details-list">
                  {/*{detailsContent &&*/}
                  {/*  detailsContent.map((item, index) => {*/}
                  {/*    return (*/}
                  {/*      <li key={index} className="details-list__item">*/}
                  {/*        <p className="details-list__item-text">*/}
                  {/*          <span className="details-list__item-text-title">{item[0]}</span>*/}
                  {/*          <span className="details-list__item-text-value">{item[1]}</span>*/}
                  {/*        </p>*/}
                  {/*      </li>*/}
                  {/*    );*/}
                  {/*  })}*/}
                </ul>
              </div>

              <Link to="/schedule" className="btn btn--bg trainer__schedule">
                К расписанию
              </Link>
            </section>
          </div>
        </main>

        <Footer menu={menu} icon={icon} />
      </div>
    </SetTrainerIdContext.Provider>
  );
};

export default TrainersPage;
