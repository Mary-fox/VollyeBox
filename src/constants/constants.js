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
export const handleBuy = (id, setter) => {
  const path = `pay/${id}/`;

  refreshToken(path, setter);
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

/*** Convert hex color to rgb/rgba ***/
export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};

/*** Refresh token ***/
export const refreshToken = (path, showLoginPopup) => {
  const token = localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (!token) {
    showLoginPopup(true);
  } else {
    api
      .get(path, config)
      .then(({ data }) => window.open(data.url))
      .catch(({ response }) => {
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');

          api
            .post('token/refresh/', { refresh: refreshToken })
            .then(({ data }) => {
              localStorage.setItem('access_token', data.access);

              api
                .get(path, {
                  headers: { Authorization: `Bearer ${data.access}` },
                })
                .then(({ data }) => window.open(data.url));
            })
            .catch(({ response }) => {
              if (response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                showLoginPopup(true);
              }
            });
        }
      });
  }
};
