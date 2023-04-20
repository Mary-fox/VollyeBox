import React from 'react';
import "./Review.scss"

function Review (props) {
const {item} = props;

return (
        <li className="review" >
            <img src={item.author.avatar ? `https://merlinsbeard.ru/${item.author.avatar}` : require("../../assets/images/defaultreview.png")} alt="author" className="review__photo" />
            <div className="review__content">
                <div className="review__title-block">
                    <div className="review__title-block_left">
                        <div className='review__name-block'>
                            <h3 className="review__name">{item.author.first_name}</h3>
                            <h3 className="review__name">{item.author.last_name}</h3>
                        </div>
                        <p  className="review__date">{item.created_at}</p>
                    </div>

                    {/* <p className='review__quantity'>кол-во тренировок  ({review.quantity})</p>  скрыли по просьбе заказчика */}
                    <div className="review-rating">
                        <div className="review-rating__items">
                            <input id={`Rating_${item.id}5`} type="radio" className="review-rating__item" name={`Rating_${item.id}`} value="5" defaultChecked={item.rating === 5 ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${item.id}5`} className="review-rating__label"></label>
                            <input id={`Rating_${item.id}4`} type="radio" className="review-rating__item" name={`Rating_${item.id}`} value="4" defaultChecked={item.rating === 4 ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${item.id}4`} className="review-rating__label"></label>
                            <input id={`Rating_${item.id}3`} type="radio" className="review-rating__item" name={`Rating_${item.id}`} value="3" defaultChecked={item.rating === 3 ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${item.id}3`} className="review-rating__label"></label>
                            <input id={`Rating_${item.id}2`} type="radio" className="review-rating__item" name={`Rating_${item.id}`} value="2" defaultChecked={item.rating === 2 ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${item.id}2`} className="review-rating__label"></label>
                            <input id={`Rating_${item.id}1`} type="radio" className="review-rating__item" name={`Rating_${item.id}`} value="1" defaultChecked={item.rating === 1 ? "defaultCheked" : ""} disabled/>
                            <label htmlFor={`Rating_${item.id}1`} className="review-rating__label"></label>
                        </div>
                    </div>
                </div>


        <div className="review__text">
            <p>{item.content}</p>
        </div>
    </div>
</li>

    )
}

export default Review;


