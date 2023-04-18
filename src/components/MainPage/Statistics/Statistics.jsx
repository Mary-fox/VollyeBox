import React from 'react';
import './Statistics.scss';
import StatisticsBlock from './StatisticBlock/StatisticsBlock';



function Statistics (props) {

  return (
    <section className='statistics'>
        <StatisticsBlock  number="2000" text="участников"/>
        <StatisticsBlock  number="200" text="проведенных тренировок"/>
        <StatisticsBlock  number="4,6" text="средняя оценка тренировки"/>
        <StatisticsBlock  number="20" text="среднее количество участников тренировки"/>
        <StatisticsBlock  number="80%" text="продолжают заниматься после первой тренировки"/>
    </section>
  );
};

export default Statistics;