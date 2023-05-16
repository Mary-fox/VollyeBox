import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import './MainSlider.scss';
import { Pagination } from 'swiper';

export default function MainSlider({ data }) {
  const options = {
    effect: 'creative',
    loop: true,
    // loopedSlides: 4,
    centeredSlides: true,
    slidesPerView: 'auto',
    creativeEffect: {
      indexModifier: false,
      limitProgress: 2,
      prev: {
        translate: ['-50%', 0, 0],
        scale: 0.777,
        transform: 'translateX(-50%)',
        opacity: 1,
      },
      next: {
        translate: ['50%', 0, 0],
        scale: 0.777,
        transform: 'translateX(50%) ',
      },
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    pagination: {
      pagination: '.swiper-pagination',
    },
  };

  return (
    <Swiper {...options} className="main-page-slider" modules={[EffectCreative, Pagination, Navigation]}>
      {data.slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={`https://merlinsbeard.ru/${slide.image}`} alt={slide.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
