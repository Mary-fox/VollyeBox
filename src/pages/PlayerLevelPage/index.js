export const changePlayerLevelHandler = (slides) => {
  const filteredArr = slides.filter((item) => item.classList.contains('swiper-slide-active'));

  return filteredArr[0].getAttribute('data-level-id');
};
