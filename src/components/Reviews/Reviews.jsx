import React, { useState, useEffect } from 'react';
import './Reviews.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { api } from '../../constants/constants';
import ReviewMainPage from '../ReviewMainPage/ReviewMainPage';

function Reviews() {
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.matchMedia('(max-width: 740px)').matches);
  const [review, setReview] = useState([]);
  useEffect(() => {
    api
      .get('reviews/?limit=4&target=s')
      .then((response) => setReview(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 740px)');
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener('change', handleScreenChange);
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  const options = {
    loop: true,
    slidesPerView: 'auto',
    pagination: {
      pagination: '.swiper-pagination',
    },
  };
  return (
    <div className="review-section">
      <h3 className="review-section__title">Отзывы</h3>
      {isSmallScreen ? (
        <ul className="review-section__list review-section__indent ">
          <Swiper {...options} className="mySwiper" modules={[Pagination, Navigation]}>
            {review.map((item) => (
              <SwiperSlide key={item.id}>
                <ReviewMainPage item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      ) : (
        <ul className="review-section__list review-section__indent">
          {review.map((item) => (
            <ReviewMainPage key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
