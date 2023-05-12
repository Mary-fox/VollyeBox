import React, { useEffect, useState } from 'react';

// Files
import './TrainersPage.scss';
import Api from '../../components/Api/Api';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TopCardsPreviewSlider from '../../components/TopCardsPreviewSlider/TopCardsPreviewSlider';

const TrainersPage = ({ menu, icon }) => {
  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle

  // Trainers
  const [trainersList, setTrainersList] = useState([]); // Top slider with all trainers
  const [activeTrainerId, setActiveTrainerId] = useState(null); // Selected trainer id
  // const [activeTrainer, setActiveTrainer] = useState([]); // Selected trainer data
  // const [activeTrainerSlides, setActiveTrainerSlides] = useState([]); // Selected trainer slides
  // const [activeTrainerReviews, setActiveTrainerReviews] = useState([]); // Selected trainer reviews

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

  return (
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
        </div>
      </main>

      <Footer menu={menu} icon={icon} />
    </div>
  );
};

export default TrainersPage;
