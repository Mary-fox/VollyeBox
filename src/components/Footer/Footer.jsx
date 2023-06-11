import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Files
import './Footer.scss';

// Context
import { MenuAndIconsContext } from '../App/App';

function Footer() {
  const { menu, icon } = useContext(MenuAndIconsContext); // Use app menu and icons context

  const footerMenu = menu.filter(({ position }) => position === 'd'); //пункты футера с позицией d

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__wrapper">
            <nav className="footer__nav">
              <ul className="footer__list">
                {footerMenu.map(({ id, slug, title }) => (
                  <li className="header__item" key={id}>
                    <Link to={slug}>{title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer__block wrapper">
          <div className="footer__logo">
            <img src={require('../../assets/images/logo.png')} alt="logo" />
          </div>
          <div className="footer__down-block">
            <Link to="/page/policy">Политика конфиденциальности</Link>
            <div className="footer__icons">
              {icon.map((item) => (
                <a className="footer__icon" href={item.slug} key={item.id} target="_blank" rel="noopener noreferrer">
                  <img src={`https://merlinsbeard.ru/${item.logo}`} alt={item.title} />
                </a>
              ))}
            </div>
            <a href="https://anyera.ru" target="_blank" rel="noopener noreferrer">
              Разработано Anyera Digital & Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
