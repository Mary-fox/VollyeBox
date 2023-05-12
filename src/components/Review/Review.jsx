import React, { useEffect, useState } from 'react';

// Files
import './Review.scss';
import authorNoImage from './author-no-image.png';
import { apiHostName } from '../../constants/constants';

// Components
import Rating from '../../components/Rating/Rating';

function Review({ item }) {
  const mobScreen = window.matchMedia('(max-width: 743px)'); // Mobile media query
  const [isMobScreen, setIsMobScreen] = useState(mobScreen.matches); // State for mobile screen

  const { author, content, created_at } = item;
  const reviewAvatar = author.avatar ? `${apiHostName}/${author.avatar}` : authorNoImage; // Review user image

  // Format review date
  const reviewDate = new Date(created_at);
  const day = reviewDate.getDate();
  const month = reviewDate.getMonth();
  const year = reviewDate.getFullYear();
  const formattedReviewDate = `${day}.${month}.${year}`;

  // Check screen width for mobile
  useEffect(() => {
    const handleScreenChange = (event) => setIsMobScreen(event.matches);

    mobScreen.addEventListener('change', handleScreenChange);

    return () => mobScreen.removeEventListener('change', handleScreenChange);
  }, []);

  return (
    <div className="review">
      <div className="review__header">
        <div className="review__avatar">
          <img src={reviewAvatar} alt="author-image" />
        </div>

        {isMobScreen && <Rating item={item} />}
      </div>

      <div className="review__body">
        <div className="review__title">
          <h3 className="review__author-name">{`${author.first_name} ${author.last_name}`}</h3>
          <span>{formattedReviewDate}</span>

          {!isMobScreen && <Rating item={item} />}
        </div>

        <div className="review__text-content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
