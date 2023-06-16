import React, { useEffect, useState, createContext, useRef } from 'react';
import { Link } from 'react-router-dom';

// Files
import './GymPage.scss';
import { api } from '../../constants/constants';

// Components
import TopCardsPreviewSlider from '../../components/TopCardsPreviewSlider/TopCardsPreviewSlider';
import Rating from '../../components/Rating/Rating';
import TabNavigationSlider from '../../components/TabNavigationSlider/TabNavigationSlider';
import SliderThumbsBottom from '../../components/SliderThumbsBottom/SliderThumbsBottom';
import Review from '../../components/Review/Review';
import MyMap from '../../components/Map/MyMap';

// Context
export const SetGymIdContext = createContext({});
export const SetSwitchTabNavigationContext = createContext({});

const GymPage = () => {
  const gymScrollRef = useRef(null);

  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle

  // Gym
  const [gymList, setGymList] = useState([]); // Top slider with all gym
  const [activeGymId, setActiveGymId] = useState(null); // Selected gym id
  const [activeGym, setActiveGym] = useState([]); // Selected gym data
  const [activeGymSlides, setActiveGymSlides] = useState([]); // Selected gym slides
  const [activeGymReviews, setActiveGymReviews] = useState([]); // Selected gym reviews

  // Selected gym details
  const [details, setDetails] = useState([]); // Gym details (tabs block. navigation and content)
  const [detailsNavigationId, setDetailsNavigationId] = useState(null); // Active details(tab) id
  const [detailsContent, setDetailsContent] = useState([]); // Active details(tab) content

  // Get default page info and gym data on page load
  useEffect(() => {
    // Set page info
    api.get('dynamic-page/gym/').then(({ data }) => {
      const pageInfo = {
        title: data.title,
        description: data.blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    // Set gym data
    api.get('gym/').then(({ data }) => {
      setGymList(data); // Set gym list
      setActiveGymId(data[0].id); // Set the first active gym id
    });
  }, []);

  // Change gym
  useEffect(() => {
    if (activeGymId) {
      api.get(`gym/${activeGymId}/`).then(({ data }) => {
        // Parse content for the first tab in details of active gym
        const defaultTabContent = data.blocks[0]?.style_content && JSON.parse(data.blocks[0]?.style_content);
        const defaultTabNav = data.blocks[0]?.id; // Gey the first active tab of active gym by default

        setActiveGym(data); // Set gym data
        setActiveGymSlides(data.gym_slides); // Set active gym slides
        setActiveGymReviews(data.gym_reviews); // Set active gym reviews
        setDetails(data.blocks); // Set all details of the gym (all tabs content)
        setDetailsNavigationId(defaultTabNav); // Set the first active tab navigation
        setDetailsContent(defaultTabContent?.blocks[0]?.data?.content); // Set the first tab content
      });
    }
  }, [activeGymId]);

  // Change details tab
  useEffect(() => {
    details.forEach(({ id, style_content }) => {
      if (id === detailsNavigationId) {
        // Parse current tab content in details of active gym
        const currentTabContent = JSON.parse(style_content);

        setDetailsContent(currentTabContent.blocks[0].data.content); // Set current tab content
      }
    });
  }, [detailsNavigationId]);

  return (
    <SetSwitchTabNavigationContext.Provider value={{ detailsNavigationId, setDetailsNavigationId }}>
      <SetGymIdContext.Provider value={{ setActiveGymId }}>
        <div className="container">
          <h1 className="page-title">{pageInfo.title}</h1>
          <p className="page-subtitle">{pageInfo.description}</p>

          {/* Top cards preview slider */}
          <section className="gym-types">
            <TopCardsPreviewSlider scrollTarget={gymScrollRef} data={gymList} />
          </section>

          {/* Active gym info */}
          <section className="gym" ref={gymScrollRef}>
            <div className="gym__images">
              <SliderThumbsBottom slides={activeGymSlides} />
            </div>

            <div className="gym__title">
              <p className="details-title">{activeGym.name}</p>

              <div className="gym__rating">
                <Rating item={activeGym} />
              </div>
            </div>

            <div className="gym__info">
              <div className="gym__info-navigation">
                {/* Details navigation slider */}
                <TabNavigationSlider data={details} />
              </div>

              <ul className="gym__info-content details-list">
                {detailsContent &&
                  detailsContent.map((item, index) => {
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
            </div>

            <Link to="/schedule" className="btn btn--bg gym__schedule">
              К расписанию
            </Link>
          </section>

          {/* Gym reviews */}
          <section className="gym-reviews">
            <ul className="reviews">
              {activeGymReviews.map((item) => {
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
        </div>

        {/* Gym map */}
        <section className="gym-map map">
          <MyMap />
        </section>
      </SetGymIdContext.Provider>
    </SetSwitchTabNavigationContext.Provider>
  );
};

export default GymPage;
