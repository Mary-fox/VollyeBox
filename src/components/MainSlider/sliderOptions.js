export const options = {
  effect: 'creative',
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
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
  breakpoints: {
    576: {
      slidesPerView: 1.75,
    },
    744: {
      slidesPerView: 2.5,
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
