import React from 'react';
import "./Reviews.scss"
import reviews from '../../data/reviews';
import Review from '../Review/Review';

function Reviews () {

return (
<div className="review-section">
  <h3 className="review-section__title">Отзывы</h3>
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

