import React from 'react';
import './BlogPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function BlogPage ({menu, icon} ) {

  return (
    <div className='background-wrapper'>
    <Header menu={menu} icon={icon}/>

    <main className='blog-page'>

    </main>
    <Footer menu={menu} icon={icon}/>
    </div>
  );
};

export default BlogPage;