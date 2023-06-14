import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import './PaymentPage.scss';
import { api, apiHostName, priceConvertHandler, shuffle, handleBuy } from '../../constants/constants';
import { productPreviewSliderOptions } from './sliderOptions';

// Components
import ProductPreviewCard from '../../components/ProductPreviewCard/ProductPreviewCard';
import AngleDecorSingle from '../../components/IconComponents/AngleDecorSingle';
import AngleDecorDouble from '../../components/IconComponents/AngleDecorDouble';

const PaymentPage = () => {
  const navigate = useNavigate();

  // Type trainings state (categories)
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Training package state (products)
  const [productsList, setProductsList] = useState([]);
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeProductInfo, setActiveProductInfo] = useState([]);

  // Related packages state (related products). Should be filtered after change product id
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Get all type categories and products on page load
  useEffect(() => {
    api.get('type-training/short/').then(({ data }) => {
      setCategoriesList(data); // Set all categories data
      setActiveCategoryId(data[0].id); // Set the first category active
    });

    api.get('product/').then(({ data }) => setRelatedProducts(shuffle(data)));
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
          <AngleDecorSingle />
        </div>

        {/* Content */}
        <div className="control select-product">
          <div className="control__block select-product__categories">
            {categoriesList.map(({ id, title, is_published }) => {
              if (is_published) {
                return (
                  <button
                    className={`control__item ${activeCategoryId === id ? 'active' : ''}`}
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
          <AngleDecorDouble />
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
          <span className="price__current">{priceConvertHandler(activeProductInfo.price)} P</span>
          {activeProductInfo.old_price && (
            <span className="price__old">{priceConvertHandler(activeProductInfo.old_price)} P</span>
          )}
        </div>

        <button className="btn btn--bg product__buy" onClick={() => handleBuy(activeProductInfo.id, navigate)}>
          купить
        </button>
      </section>

      {/*** Related products ***/}
      <section className="related-products-section">
        <h2 className="page-title">также покупают</h2>

        <div className="related-products">
          <Swiper {...productPreviewSliderOptions} modules={[Pagination]} className="related-products__slider">
            {relatedProducts.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductPreviewCard previewItem={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;
