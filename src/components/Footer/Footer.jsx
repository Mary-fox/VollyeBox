import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Files
import './Footer.scss';
import logo from './logo.png';

// Components
import Social from '../Social/Social';

// Context
import { MenuAndIconsContext } from '../App/App';

function Footer() {
  const { menu } = useContext(MenuAndIconsContext); // Use app menu context

  const footerMenu = menu.filter(({ position }) => position === 'd'); //пункты футера с позицией d

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__nav">
          <ul className="footer-menu">
            {footerMenu.map(({ id, slug, title }) => (
              <li className="footer-menu__item" key={id}>
                <Link to={slug}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <hr className="footer__divider" />

      <div className="container">
        <div className="footer__logo">
          <img src={logo} alt="logo" title="logo" />
        </div>

        <Social />

        <div className="footer__policy">
          <div className="footer__policy-item">
            <Link to="/page/policy">Политика конфиденциальности</Link>
          </div>

          <div className="footer__policy-item">
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
