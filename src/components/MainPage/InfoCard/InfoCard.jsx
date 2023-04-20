import React from 'react';
import './InfoCard.scss';
import { Link } from 'react-router-dom';



function InfoCard (props) {
  const { linkSmall, linkLarge} = props;
  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.matchMedia("(max-width: 740px)").matches
  );  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 740px)");
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);
  return (
        <div className="info-card">
           {isSmallScreen ?(<img className="info-card__image" src={linkSmall} alt="card" />) : (<img className="info-card__image" src={linkLarge} alt="card"/>)}
            <div className="info-card__content">
              <h2 className='info-card__title'>{props.title}</h2>
              <Link className='info-card__btn' to={props.link}>{props.btn}</Link>
            </div>
        </div>
  );
};

export default InfoCard;