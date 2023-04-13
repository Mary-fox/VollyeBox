import React from 'react';
import "./Reviews.scss"
import reviews from '../../data/reviews';
import Review from '../Review/Review';

function Reviews () {

return (
  <div className="review-section">
  <div className="review-section__header">
      <div className="review-section__wrapper">
          <h3 className="review-section__title">Отзывы</h3>
      </div>
  </div>
<ul className="review-section__list review-section__indent">
    {reviews.map((review) => (
      <Review key={review.id} review={review}/>  
    )
    )}
      
</ul>
</div>
)
}

export default Reviews;

