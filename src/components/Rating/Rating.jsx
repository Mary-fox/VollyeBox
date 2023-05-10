import React from 'react';

// Files
import './Rating.scss';

const Rating = ({ item }) => {
  return (
    <div className="rating">
      <label className={`rating__item ${item.rating >= 1 ? 'rank' : ''}`}>
        <input
          type="radio"
          className="rating__input"
          name={`rating_${item.id}`}
          value="1"
          defaultChecked={item.rating === 1 ? 'checked' : ''}
        />
      </label>

      <label className={`rating__item ${item.rating >= 2 ? 'rank' : ''}`}>
        <input
          type="radio"
          className="rating__input"
          name={`rating_${item.id}`}
          value="2"
          defaultChecked={item.rating === 2 ? 'checked' : ''}
        />
      </label>

      <label className={`rating__item ${item.rating >= 3 ? 'rank' : ''}`}>
        <input
          type="radio"
          className="rating__input"
          name={`rating_${item.id}`}
          value="3"
          defaultChecked={item.rating === 3 ? 'checked' : ''}
        />
      </label>

      <label className={`rating__item ${item.rating >= 4 ? 'rank' : ''}`}>
        <input
          type="radio"
          className="rating__input"
          name={`rating_${item.id}`}
          value="4"
          defaultChecked={item.rating === 4 ? 'checked' : ''}
        />
      </label>

      <label className={`rating__item ${item.rating >= 5 ? 'rank' : ''}`}>
        <input
          type="radio"
          className="rating__input"
          name={`rating_${item.id}`}
          value="5"
          defaultChecked={item.rating >= 4 ? 'rank' : ''}
        />
      </label>
    </div>
  );
};

export default Rating;
