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
