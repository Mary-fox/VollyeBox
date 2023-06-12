import React from 'react';

// Files
import './Loader.scss';
import loader from './loader.gif';

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="gif" />
    </div>
  );
};

export default Loader;
