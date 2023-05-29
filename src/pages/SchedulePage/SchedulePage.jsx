import React, { useEffect, useState } from 'react';

// Files
import './SchedulePage.scss';
import { api, apiHostName } from '../../constants/constants';

const SchedulePage = () => {
  // Page
  const [pageInfo, setPageInfo] = useState({}); // Page title and subtitle info state
  const [level, setLevel] = useState([]); // Training level state

  // Get default page info on page load
  useEffect(() => {
    // Set page info
    api.get('dynamic-page/schedule/').then(({ data }) => {
      const pageInfo = {
        title: data.title,
        description: data.blocks[0].content,
      };

      setPageInfo(pageInfo);
    });

    // Get training level
    api.get('player-level/').then(({ data }) => {
      // console.log(data);
      setLevel(data); // Set training level list
    });
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">{pageInfo.title}</h1>

      <div className="schedule-subtitle-wrapper">
        <p className="page-subtitle">{pageInfo.description}</p>

        <div className="subtitle-level">
          {level.length > 0 &&
            level.map(({ id, title, image, is_published }) => {
              if (is_published) {
                return (
                  <div className="subtitle-level__item" key={id}>
                    <div className="subtitle-level__item-image">
                      <img src={`${apiHostName}${image}`} alt="" />
                    </div>

                    <div className="subtitle-level__item-title">{`${title} уровень`}</div>
                  </div>
                );
              }
            })}
        </div>
      </div>

      <section className="schedule">
        <div className="schedule__filter">schedule filter</div>
        <div className="schedule__body">schedule body</div>
      </section>
    </div>
  );
};

export default SchedulePage;
