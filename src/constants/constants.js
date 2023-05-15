import axios from 'axios';

/*** Api hostname ***/
export const apiHostName = 'https://merlinsbeard.ru';

/*** Base api url ***/
export const api = axios.create({
  baseURL: `${apiHostName}/api/v1/`,
});
