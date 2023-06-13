import React, { useContext } from 'react';

// Files
import './Social.scss';
import { apiHostName } from '../../constants/constants';
import { MenuAndIconsContext } from '../App/App';

const Social = () => {
  const { icon } = useContext(MenuAndIconsContext); // Use app icons context

  return (
    <div className="social">
      {icon &&
        icon.map(({ id, slug, logo, title }) => (
          <a className="social__icon" href={slug} key={id} target="_blank" rel="noopener noreferrer">
            <img src={`${apiHostName}${logo}`} alt={title} />
          </a>
        ))}
    </div>
  );
};

export default Social;
