import React from 'react';

// Files
import './InfoBlock.scss';
import { apiHostName } from '../../../constants/constants';

const InfoBlock = ({ data }) => {
  const blockOne = data.blocks?.find((item) => item.slug === 'home_first_block');
  const blockOneTitle = blockOne.description.substring(0, blockOne.description.lastIndexOf(' '));
  const blockOneSubstringTitle = blockOne.description.split(' ').pop();

  const blockSecond = data.blocks?.find((item) => item.slug === 'home_second_block');
  const blockSecondTitle = blockSecond.description.substring(0, blockSecond.description.lastIndexOf(' '));
  const blockSecondSubstringTitle = blockSecond.description.split(' ').pop();

  return (
    <div className="info-block">
      {blockOne && (
        <div className="info-block__item">
          <div className="info-block__image">
            <img src={`${apiHostName}${blockOne.image}`} alt="info" />
          </div>

          <div className="info-block__content">
            <h2 className="info-block__content-title">
              {blockOneTitle} <span>{blockOneSubstringTitle}</span>
            </h2>

            <p className="info-block__content-text">{blockOne.content}</p>
          </div>
        </div>
      )}

      {blockSecond && (
        <div className="info-block__item info-block__item--reverse">
          <div className="info-block__image">
            <img src={`${apiHostName}${blockSecond.image}`} alt="info" />
          </div>

          <div className="info-block__content">
            <h2 className="info-block__content-title">
              {blockSecondTitle} <span>{blockSecondSubstringTitle}</span>
            </h2>

            <p className="info-block__content-text">{blockSecond.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBlock;
