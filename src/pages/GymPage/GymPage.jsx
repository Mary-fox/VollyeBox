import React, { useEffect, useState, createContext } from 'react';
import { Link } from 'react-router-dom';

// Files
import './GymPage.scss';
import Api from '../../components/Api/Api';
import { apiHostName } from '../../constants/constants';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TopCardsPreviewSlider from '../../components/TopCardsPreviewSlider/TopCardsPreviewSlider';
import Rating from '../../components/Rating/Rating';

// Context
export const SetIdContext = createContext({});

const GymPage = ({ menu, icon }) => {
  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle

  // Gym
  const [gymList, seGymList] = useState([]); // Top slider with all gym
  const [activeGymId, setActiveGymId] = useState(1); // Selected gym id
  const [activeGym, setActiveGym] = useState([]); // Selected gym data

  // Selected gym details
  const [details, setDetails] = useState([]); // Gym details (tabs block. navigation and content)
  const [detailsNavigationId, setDetailsNavigationId] = useState(null); // Active details(tab) id
  const [detailsContent, setDetailsContent] = useState([]); // Active details(tab) content

  // Get page info and gym list on page load
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

  // Change gym
  useEffect(() => {
    Api.get(`api/v1/gym/${activeGymId}/`).then(({ data }) => {
      // console.log(activeGymId, 'activeGymId');
      // console.log(data, 'data');
      // Parse content for the first tab in details of active gym after change gym
      const defaultTabContent = data.blocks[0]?.style_content && JSON.parse(data.blocks[0]?.style_content);

      // console.log(defaultTabContent, 'defaultTabContent');

      setActiveGym(data); // Set gym data
      setDetails(data.blocks); // Set all details of the gym (all tabs content)
      setDetailsContent(defaultTabContent?.blocks[0]?.data?.content); // Set the first tab content
    });
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
    <SetIdContext.Provider value={{ setActiveGymId }}>
      <div className="gym-page background">
        <Header menu={menu} icon={icon} />

        <main className="container">
          <h1 className="page-title">{pageInfo.title}</h1>
          <p className="page-subtitle">{pageInfo.description}</p>

          {/* Top cards preview slider */}
          <section className="gym-types">
            <TopCardsPreviewSlider data={gymList} />
          </section>

          {/* Active gym info */}
          <section className="gym">
            <div className="gym__images">
              <img
                src={`${apiHostName}/media/filer_public/40/8a/408a5b34-a8fb-41b0-9dc1-bfb5a0bd5283/1574409896_9268a1b816ad1a4855af31dddf3466a7.jpg`}
                alt=""
              />
            </div>

            <div className="gym__title">
              <p className="details-title">{activeGym.name}</p>

              <div className="gym__rating">
                <Rating item={activeGym} />
              </div>
            </div>

            <div className="gym__info">
              <div className="gym__info-navigation">
                {details.map(({ id, title }) => (
                  <p key={id} onClick={() => setDetailsNavigationId(id)}>
                    {title}
                  </p>
                ))}
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

          <section className="gym-map"></section>
        </main>

        <Footer menu={menu} icon={icon} />
      </div>
    </SetIdContext.Provider>
  );
};

export default GymPage;
