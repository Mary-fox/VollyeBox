import React from 'react';

// Files
import './AppPageTopDecor.scss';
import img from './background-top.png';

const AppPageTopDecor = () => {
  return (
    <div className="app-page-top-decor">
      <img src={img} alt="page-top-decor" title="page-top-decor" />
    </div>
  );
};

export default AppPageTopDecor;
