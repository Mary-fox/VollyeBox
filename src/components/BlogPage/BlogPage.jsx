import React from 'react';

// Files
import './BlogPage.scss';
import myGif from '../Loader/loader.gif';

// Components
import Articles from './Articles/Articles';

function BlogPage() {
  if (Articles) {
    return (
      <div className="wrapper">
        <Articles />
      </div>
    );
  } else {
    return (
      <div className="loader">
        <img src={myGif} alt="gif" />
      </div>
    );
  }
}

export default BlogPage;
