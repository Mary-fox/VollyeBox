import React, { useState, useEffect } from 'react';
import './Statistics.scss';
import StatisticsBlock from './StatisticBlock/StatisticsBlock';
import { api } from '../../../constants/constants';

function Statistics(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    api
      .get('statistic/')
      .then((response) => setData(response.data[0]))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {data.is_published && (
        <section className="statistics">
          <StatisticsBlock number={data.count_users} text="участников" />
          <StatisticsBlock number={data.count_klass} text="проведенных тренировок" />
          <StatisticsBlock number={data.rating_klass} text="средняя оценка тренировки" />
          <StatisticsBlock number={data.avg_players} text="среднее количество участников тренировки" />
          <StatisticsBlock number={data.continue_players} text="продолжают заниматься после первой тренировки" />
        </section>
      )}
    </>
  );
}

export default Statistics;
