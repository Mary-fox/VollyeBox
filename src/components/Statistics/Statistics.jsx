import React, { useState, useEffect } from 'react';

// Files
import './Statistics.scss';
import { api } from '../../constants/constants';

function Statistics() {
  const [statisticData, setStatisticData] = useState([]); // Данные статистики
  const [publishStatistic, setPublishStatistic] = useState(false); // Статус опубликованной статистики

  useEffect(() => {
    api
      .get('statistic/')
      .then(({ data }) => {
        // Объект данных статистики
        const statisticRenderData = [
          {
            text: 'участников',
            title: 'count_users',
            value: data[0].count_users,
          },
          {
            text: 'проведенных тренировок',
            title: 'count_klass',
            value: data[0].count_klass,
          },
          {
            text: 'средняя оценка тренировки',
            title: 'rating_klass',
            value: data[0].rating_klass,
          },
          {
            text: 'среднее количество участников тренировки',
            title: 'avg_players',
            value: data[0].avg_players,
          },
          {
            text: 'продолжают заниматься после первой тренировки',
            title: 'continue_players',
            value: `${data[0].continue_players}%`,
          },
        ];

        setStatisticData(statisticRenderData); // Set statistic data
        setPublishStatistic(data[0].is_published); // Set is published state
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {publishStatistic && (
        <section className="statistics">
          {statisticData.map(({ text, value }, index) => (
            <div className="statistics__item" key={index}>
              <span className="statistics__item-number">{value}</span>
              <span className="statistics__item-text">{text}</span>
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default Statistics;
