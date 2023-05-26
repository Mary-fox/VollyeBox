// Get token from local storage
const token = localStorage.getItem('access_token');

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};
