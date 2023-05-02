import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';


function Footer ({menu, icon}) {
    const linkDown = menu.filter(item => item.position === "d"); //пункты футера с позицией u

  return (
    <footer className='footer'>

            <div className="footer__container">
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
                <div className='footer__block wrapper'>
                    <div className="footer__logo">
                            <img src={require("../../assets/images/logo.png")} alt="logo" />
                    </div>
                    <div className="footer__down-block">
                        <Link to="/privacy-policy/">Политика конфиденциальности</Link>
                        <div className="footer__icons">
                                    {icon.map((item) => (
                                        <a className="footer__icon" href={item.slug}  key={item.id}  target="_blank" rel="noopener noreferrer"><img src={`https://merlinsbeard.ru/${item.logo}`} alt={item.title}/></a>
                                    ))}
                        </div>
                        <a href="https://anyera.ru"  target="_blank" rel="noopener noreferrer">Разработано Anyera Digital & Design</a>
                    </div>

                </div>

            </div>    

        
    </footer>
  );
};

export default Footer;

