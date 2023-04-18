import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
// import vk from '../../assets/icon/VK.svg';
import telegram from '../../assets/icon/Telegram.svg';
// import youtube from '../../assets/icon/YouTube.svg';

function Footer () {

  return (
    <footer className='footer'>
        <div className="footer__contaner">
            
        <div className="footer__content">
            <div className="footer__wrapper">
                <nav className="footer__nav">
                    <ul className="footer__list">
                        <li className="footer__item"><Link to="#!">ЗАЛЫ</Link></li>
                        <li className="footer__item"><Link to="#!">ТРЕНЕРА</Link></li>
                        <li className="footer__item"><Link to="#!">РАСПИСАНИЕ</Link></li>
                        <li className="footer__item"><Link to="#!">БЛОГ</Link></li>
                        <li className="footer__item"><Link to="#!">ОПЛАТА</Link></li>
                    </ul>
                </nav>
                </div>
            </div>    
                <div className="footer__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <div className="footer__icons">
                    {/* <a href="#!"><img src={vk} alt="icon vk"/></a> скрыли по просьбе заказчика */}
                    <a href="#!"><img src={telegram} alt="icon telegram"/></a>
                    {/* <a href="#!"><img src={youtube} alt="icon youtube"/></a> скрыли по просьбе заказчика */}
                </div>

        </div>    
    </footer>
  );
};

export default Footer;