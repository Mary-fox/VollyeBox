import React from 'react';
import './InfoCard.scss';



function InfoCard (props) {
 const { backgroundStyle } = props;

  return (
        <div className={`info-card ${backgroundStyle}`}>
            <h2 className='info-card__title'>{props.title}</h2>
            <a className='info-card__btn'href={props.link}>{props.btn}</a>
        </div>
  );
};

export default InfoCard;