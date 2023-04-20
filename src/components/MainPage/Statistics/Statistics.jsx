import React, {useState, useEffect} from 'react';
import './Statistics.scss';
import StatisticsBlock from './StatisticBlock/StatisticsBlock';
import Api from '../../Api/Api';


function Statistics (props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    Api.get('api/v1/statistic/')
    .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);
  return (
    <section className='statistics'>
    {data.map((item) => (
      item.is_published && (
        <>
          <StatisticsBlock 
            number={item.count_users} 
            text="участников"
            key="count_users"
          />
          <StatisticsBlock 
            number={item.count_klass} 
            text="проведенных тренировок"
            key="count_klass"
          />
          <StatisticsBlock 
            number={item.rating_klass} 
            text="средняя оценка тренировки"
            key="rating_klass"
          />
          <StatisticsBlock 
            number={item.avg_players} 
            text="среднее количество участников тренировки"
            key="avg_players"
          />
          <StatisticsBlock 
            number={item.continue_players} 
            text="продолжают заниматься после первой тренировки"
            key="continue_players"
          />
        </>
      )
    ))}
  </section>
  );
};

export default Statistics;