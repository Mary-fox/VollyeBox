import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import vk from '../../assets/icon/VK.svg';
import telegram from '../../assets/icon/Telegram.svg';
import youtube from '../../assets/icon/YouTube.svg';

function Footer () {

  return (
    <header className='footer'>
        <div className="footer__wrapper">
            <div className="footer__content">
                <nav className="footer__nav">
                    <ul className="footer__list">
                        <li className="footer__item"><Link to="#!">ТРЕНИРОВКИ</Link></li>
                        <li className="footer__item"><Link to="#!">FAQ</Link></li>
                        <li className="footer__item"><Link to="#!">РАСПИСАНИЯ</Link></li>
                        <li className="footer__item"><Link to="#!">ЦЕНЫ</Link></li>
                        <li className="footer__item"><Link to="#!">БЛОГ</Link></li>
                    </ul>
                </nav>
                <div className="footer__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <div className="footer__icons">
                    <a href="#!"><img src={vk} alt="icon vk"/></a>
                    <a href="#!"><img src={telegram} alt="icon telegram"/></a>
                    <a href="#!"><img src={youtube} alt="icon youtube"/></a>
                </div>
            </div>
        </div>    
    </header>
  );
};

export default Footer;