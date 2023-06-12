import React from 'react';
import { Link } from 'react-router-dom';

// Files
import './InfoCards.scss';
import { apiHostName } from '../../../constants/constants';

function InfoCards({ data }) {
  const cardOne = data.blocks?.find((item) => item.slug === 'home-block-link-first');
  const cardSecond = data.blocks?.find((item) => item.slug === 'home-block-link-second');

  return (
    <div className="info-cards">
      {cardOne && (
        <div className="info-cards__item info-card">
          <div className="info-card__image">
            <img src={`${apiHostName}${cardOne.image}`} alt="card" />
          </div>

          <div className="info-card__content">
            <h2 className="info-card__title">{cardOne.content}</h2>

            <Link className="info-card__btn btn btn--bg" to={cardOne.description}>
              Подробнее
            </Link>
          </div>
        </div>
      )}

      {cardSecond && (
        <div className="info-cards__item info-card">
          <div className="info-card__image">
            <img src={`${apiHostName}${cardSecond.image}`} alt="card" />
          </div>

          <div className="info-card__content">
            <h2 className="info-card__title">{cardSecond.content}</h2>

            <Link className="info-card__btn btn btn--bg" to={cardSecond.description}>
              Подробнее
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCards;
