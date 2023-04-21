import React from 'react';
import './BlogPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Articles from './Articles/Articles';

function BlogPage ({menu, icon} ) {

  return (
    <div className='blog-page blog-page__background'>
    <Header menu={menu} icon={icon}/>

    <main className='main wrapper'>
      <Articles />
    </main>
    <Footer menu={menu} icon={icon}/>
    </div>
  );
};

export default BlogPage;