import React, {useState} from 'react';
import './BlogPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Articles from './Articles/Articles';
import myGif from '../../assets/images/Frame.gif';

function BlogPage (props) {
  const {menu, icon} = props;
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const [isPopupLogoutOpen, setIsPopupLogoutOpen] = useState(false);
  if (Articles) {  
  return (
    <div className='blog-page background'>
      <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen} isPopupLogoutOpen={isPopupLogoutOpen} setIsPopupLogoutOpen={setIsPopupLogoutOpen}/>

    <main className='main wrapper'>
      <Articles />
    </main>
    <Footer menu={menu} icon={icon}/>
    </div>
  );} else {
    return (
    <div className='loader'>
      <img src={myGif} alt="gif" />
    </div>)
  }
}

export default BlogPage;