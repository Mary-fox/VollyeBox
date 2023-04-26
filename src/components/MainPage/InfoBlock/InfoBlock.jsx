import React from 'react';
import './InfoBlock.scss';




function InfoBlock ({data} ) {
    const blockOne = data.blocks.find(item => item.slug === "home_first_block");
    const blockSecond = data.blocks.find(item => item.slug === "home_second_block");
  return (
        <div className="info-block">
            {blockOne && (
          <div className="info-block__info">
            
                <img src={`https://merlinsbeard.ru/${blockOne.image}`} alt="info" />
                <div className="info-block__info-text">
                    <h2 className="info-block__title">{blockOne.description.substring(0, blockOne.description.lastIndexOf(" ")) } <span>{blockOne.description.split(" ").pop( )}</span></h2>
                    <p className="info-block__text">{blockOne.content}</p>
                </div>
            </div>
            )}
             {blockSecond && (
            <div className="info-block__info">
                <div className="info-block__info-text">
                    <h2 className="info-block__title">{blockSecond.description.substring(0, blockSecond.description.lastIndexOf(" ")) } <span>{blockSecond.description.split(" ").pop( )}</span></h2>
                    <p className="info-block__text">{blockSecond.content}</p>
                </div>
                <img src={`https://merlinsbeard.ru/${blockSecond.image}`} alt="info" />
            </div>
             )}
        </div>
  );
};

export default InfoBlock;