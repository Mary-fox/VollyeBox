import React from 'react';
import './StatisticsBlock.scss';



function StatisticsBlock (props) {

  return (
    <div className='statistics-block'>
        <h2 className='statistics-block__number'>{props.number}</h2>
        <p className='statistics-block__text'>{props.text}</p>
    </div>
  );
};

export default StatisticsBlock;