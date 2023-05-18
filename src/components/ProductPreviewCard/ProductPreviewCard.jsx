import React from 'react';
import { Link } from 'react-router-dom';

// Files
import './ProductPreviewCard.scss';
import { apiHostName, priceConvertHandler } from '../../constants/constants';

const ProductPreviewCard = ({ previewItem }) => {
  const { id, title, sub_description, image, price, old_price } = previewItem;

  return (
    <div id={id} className="product-preview">
      <div className="product-preview__image">
        <img src={`${apiHostName}${image}`} alt={title} title={title} />
      </div>

      <div className="product-preview__content">
        <div className="product-preview__content-title">{title}</div>
        <p className="product-preview__content-subtitle">{sub_description}</p>

        <div className="product-preview__content-price price">
          <span className="price__current">{priceConvertHandler(price)} P</span>
          {old_price && <span className="price__old">{priceConvertHandler(old_price)} P</span>}
        </div>
      </div>

      <Link to="/schedule" className="btn btn--bg product-preview__buy">
        купить
      </Link>
    </div>
  );
};

export default ProductPreviewCard;
