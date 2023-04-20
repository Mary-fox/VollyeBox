import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
// import vk from '../../assets/icon/VK.svg';
import telegram from '../../assets/icon/Telegram.svg';
// import youtube from '../../assets/icon/YouTube.svg';

function Footer ({menu, icon}) {
    const linkDown = menu.filter(item => item.position === "d"); //пункты футера с позицией u

  return (
    <footer className='footer'>
        <div className="footer__contaner">
            
        <div className="footer__content">
            <div className="footer__wrapper">
                <nav className="footer__nav">
                    <ul className="footer__list">
                        {linkDown.map((item) => (
                        <li className="header__item" key={item.id}><Link to={item.slug}>{item.title}</Link></li>  ))}
                    </ul>
                </nav>
                </div>
            </div>    
                <div className="footer__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <div className="footer__icons">
                    {icon.map((item) => (
                        <a className="footer__icon" href={item.slug} target="_blank"><img src={`https://merlinsbeard.ru/${item.logo}`} alt={item.title}/></a>
                    ))}
                </div>

        </div>    
    </footer>
  );
};

export default Footer;

