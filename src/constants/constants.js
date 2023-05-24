import axios from 'axios';

/*** Api hostname ***/
export const apiHostName = 'https://merlinsbeard.ru';

/*** Base api url ***/
export const api = axios.create({
  baseURL: `${apiHostName}/api/v1/`,
});

/*** Price convert ***/
export const priceConvertHandler = (price) => {
  if (price) {
    return price.slice(0, -3);
  }
};

/*** Random sort array ***/
export const shuffle = (array) => {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/*** Buy product function ***/
export const handleBuy = (id, navigate) => {
  const token = localStorage.getItem('access_token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  api
    .get(`pay/${id}/`, config)
    .then(({ data }) => window.open(data.url))
    .catch(() => navigate('/registration'));
};

/*** Format date ***/
export const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${day}.${month}.${year}`;
};

/*** Toggle no-scroll class when popup open/close ***/
export const toggleBodyScrollHandler = () => {
  const body = document.querySelector('body');

  body.classList.toggle('no-scroll');
};
