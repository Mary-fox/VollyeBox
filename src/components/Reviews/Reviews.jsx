import React from 'react';
import "./Reviews.scss"
import reviews from '../../data/reviews';
import Review from '../Review/Review';
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation } from 'swiper';
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Reviews () {

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.matchMedia("(max-width: 740px)").matches
  );
  // window.matchMedia("(max-width: 740px)") возвращает объект MediaQueryList, который представляет состояние соответствия медиазапроса, а свойство matches возвращает текущее состояние соответствия медиазапроса
  
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


  const options = {
  loop: true,
  slidesPerView: "auto",
  pagination:{  
    pagination: '.swiper-pagination'     
  },

};

return (
<div className="review-section">
  <h3 className="review-section__title">Отзывы</h3>
  {isSmallScreen ? 
    (<ul className="review-section__list review-section__indent ">
      <Swiper {...options}  className="mySwiper"  
      modules={[Pagination,Navigation]}>
          {reviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <Review review={review}/>  
                  </SwiperSlide>))}
      </Swiper>
    </ul>) : 
    (<ul className="review-section__list review-section__indent">
          {reviews.map((review) => (
            <Review key={review.id} review={review}/>  ))}
    </ul>)}
</div>
)
}

export default Reviews;

