import React, { useState, useEffect} from 'react';
import './StaticPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import Api from '../Api/Api';


function StaticPage({menu, icon} ) {
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const { slug } = useParams();
  const [staticPage, setStaticPage] = useState([]);

  useEffect(() => {
    Api.get(`/api/v1/static-page/${slug}/`) 
    .then(response => setStaticPage(response.data))
    .catch(error => console.error(error));
}, [slug]);

if (staticPage) { 


  return (
    <div className='static-page background'>
      <Header menu={menu} icon={icon} isPopupAccountOpen={isPopupAccountOpen} setIsPopupAccountOpen={setIsPopupAccountOpen}/>
      <section className='static-page__content wrapper'>
        <h1 className='static-page__title'>{staticPage.title}</h1>
        {staticPage.image && <img  className='static-page__image' src={`https://merlinsbeard.ru/${staticPage.image}`} alt="static"  /> }
        <div dangerouslySetInnerHTML={{__html: staticPage.content}}></div>
      </section>
      
      <Footer menu={menu} icon={icon}/>
    </div>
    );} else {
      return <div>Loading...</div>;
    }
    
  };

export default StaticPage;

