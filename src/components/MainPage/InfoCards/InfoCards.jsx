import React from 'react';
import './InfoCards.scss';
import InfoCard from '../InfoCard/InfoCard';


function InfoCards ({data}) {
    const cardkOne = data.blocks.find(item => item.slug === "home-block-link-first");
    const cardSecond = data.blocks.find(item => item.slug === "home-block-link-second");
  return (
    <div className="info-cards__card-block">
        {cardkOne && ( 
            <InfoCard 
                linkSmall={`https://merlinsbeard.ru/${cardkOne.image_mob}`}
                linkLarge={`https://merlinsbeard.ru/${cardkOne.image}`}
                title={cardkOne.content}
                link={cardkOne.description}
                btn="Подробнее"/> )}
         {cardSecond && (
            <InfoCard 
                linkSmall={`https://merlinsbeard.ru/${cardSecond.image_mob}`}
                linkLarge={`https://merlinsbeard.ru/${cardSecond.image}`}
                title={cardSecond.content}
                link={cardSecond.description}
                btn="Подробнее"/>)}
    </div>
  );
};

export default InfoCards;