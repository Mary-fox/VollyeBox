import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Files
import './PaymentPage.scss';
import { api, apiHostName } from '../../constants/constants';

const PaymentPage = () => {
  // Type trainings state (categories)
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Training package state (products)
  const [productsList, setProductsList] = useState([]);
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeProductInfo, setActiveProductInfo] = useState([]);

  // Related packages state (related products). Should be filtered after change product id
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Get all type categories on page load
  useEffect(() => {
    api.get('type-training/short/').then(({ data }) => {
      setCategoriesList(data); // Set all categories data
      setActiveCategoryId(data[0].id); // Set the first category active

      // console.log(data, 'data');
    });

    // api.get('product/').then(({ data }) => {
    //   setCategoriesList(data);
    // });
  }, []);

  // Change category
  useEffect(() => {
    const filteredCategoryArr = categoriesList.filter(({ id, products }) => activeCategoryId === id);
    const productsInFilteredCategoryArr = filteredCategoryArr[0]?.products;

    // Set products of active category
    setProductsList(productsInFilteredCategoryArr);

    // Set the first product active
    productsInFilteredCategoryArr && setActiveProductId(productsInFilteredCategoryArr[0].id);
  }, [activeCategoryId]);

  // Change product
  useEffect(() => {
    if (activeProductId) {
      api.get(`product/${activeProductId}/`).then(({ data }) => setActiveProductInfo(data));
    }
  }, [activeProductId]);

  return (
    <div className="container">
      <h1 className="page-title">оплата</h1>

      {/*** Select categories and products ***/}
      <section className="select-training-wrapper select-product-wrapper">
        {/* Top left decor element */}
        <div className="select-training-wrapper__left-decor">
          <svg width="182" height="89" viewBox="0 0 182 89" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H170L182 16.3774H15V88.8351L0 77.9169V0Z" fill="currentColor" />
          </svg>
        </div>

        {/* Content */}
        <div className="control select-product">
          <div className="control__block select-product__categories">
            {categoriesList.map(({ id, title, is_published }) => {
              if (is_published) {
                return (
                  <button
                    className={`control__item ${activeCategoryId === id && 'active'}`}
                    key={id}
                    onClick={() => setActiveCategoryId(id)}
                  >
                    {title}
                  </button>
                );
              }
            })}
          </div>

          <div className="control__block select-product__products">
            {productsList &&
              productsList.map(({ id, title }) => {
                return (
                  <button
                    className={`control__item ${activeProductId === id && 'active'}`}
                    key={id}
                    onClick={() => setActiveProductId(id)}
                  >
                    {title}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Bottom right decor element */}
        <div className="select-training-wrapper__right-decor">
          <svg width="250" height="246" viewBox="0 0 250 246" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M233 121.926L232 8.77292L241 0.33606V90.6601L249.134 99.0608L248.699 140.047L237 151.207L221.5 155.177L154.5 223.168V235.576L144 245.005L100.5 245.005L97.5 238.553H0L11.5 229.124H124L233 121.926Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/*** Product info ***/}
      <section className="product-info-section product">
        <p className="details-title product__title">{activeProductInfo.title}</p>

        <div className="product__image">
          <img src={`${apiHostName}${activeProductInfo.image}`} alt={activeProductInfo.title} />
        </div>

        <div className="product__description">
          <span className="product__description-title">Описание</span>

          <div
            className="product__description-list"
            dangerouslySetInnerHTML={{ __html: activeProductInfo.description }}
          />
        </div>

        <div className="product__price price">
          <span className="price__current">{activeProductInfo.price} P</span>
          <span className="price__old">{activeProductInfo.old_price} P</span>
        </div>

        <Link to="/schedule" className="btn btn--bg product__schedule">
          купить
        </Link>
      </section>

      {/*** Related products ***/}
      <section className="related-products-section">также покупают</section>
    </div>
  );
};

export default PaymentPage;
