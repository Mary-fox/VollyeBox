import React from 'react';
import "./Review.scss"

function Review (props) {
const {review} = props;

return (
        <li className="review" >
            <img src={review.photoAuthor} alt={review.alt} className="review__photo" />
            <div className="review__content">
                <div className="review__title-block">
                    <div className="review__title-block_left">
                        <h3 className="review__name">{review.name}</h3>
                        <p  className="review__date">{review.date}</p>
                    </div>

                    {/* <p className='review__quantity'>кол-во тренировок  ({review.quantity})</p>  скрыли по просьбе заказчика */}
                    <div className="review-rating">
                        <div className="review-rating__items">
                            <input id={`Rating_${review.id}5`} type="radio" className="review-rating__item" name={`Rating_${review.id}`} value="5" defaultChecked={review.rating === '5' ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${review.id}5`} className="review-rating__label"></label>
                            <input id={`Rating_${review.id}4`} type="radio" className="review-rating__item" name={`Rating_${review.id}`} value="4" defaultChecked={review.rating === '4' ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${review.id}4`} className="review-rating__label"></label>
                            <input id={`Rating_${review.id}3`} type="radio" className="review-rating__item" name={`Rating_${review.id}`} value="3" defaultChecked={review.rating === '3' ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${review.id}3`} className="review-rating__label"></label>
                            <input id={`Rating_${review.id}2`} type="radio" className="review-rating__item" name={`Rating_${review.id}`} value="2" defaultChecked={review.rating === '2' ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${review.id}2`} className="review-rating__label"></label>
                            <input id={`Rating_${review.id}1`} type="radio" className="review-rating__item" name={`Rating_${review.id}`} value="1" defaultChecked={review.rating === '1' ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${review.id}1`} className="review-rating__label"></label>
                        </div>
                    </div>
                </div>


        <div className="review__text">
            <p>{review.text}</p>
        </div>
    </div>
</li>

    )
}

export default Review;


