import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Files
import './Header.scss';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';
import burger from '../../assets/icon/burger.svg';

// Components
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Overlay from '../Overlay/Overlay';
import PopupAccount from '../PopupAccount/PopupAccount';
import PopupLogout from '../PopupLogout/PopupLogout';
import { IsLoggedInContext } from '../App/App';

function Header(props) {
  // Use user state context
  const { isLoggedIn } = useContext(IsLoggedInContext);

  const { menu, icon } = props;

  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const [isPopupLogoutOpen, setIsPopupLogoutOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();

  const linkUp = menu.filter((item) => item.position === 'u'); //пункты хедера с позицией u
  const headerLink = linkUp.filter((item) => item.children.length === 0); //пункты хедера без тренировок

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]); //проверка на авторизацию пользователя

  const [isSmallScreen, setIsSmallScreen] = React.useState(window.matchMedia('(max-width: 1300px)').matches);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1300px)');
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener('change', handleScreenChange);
    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');

  function handleIconClick() {
    if (accessToken) {
      navigate('/');
    } else {
      setIsPopupAccountOpen(!isPopupAccountOpen);
    }
  }

  //если человек уже авторизаван, то открываем личный кабинет(пока главную страницу)
  const handleLogoutClick = () => {
    setIsPopupLogoutOpen(!isPopupLogoutOpen);
  }; //попап выхода из аккаунта

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <div className="header__content">
            <div className="header__logo">
              <Link to="/">
                {isSmallScreen ? (
                  <img src={require('../../assets/images/logo-2.png')} alt="logo" />
                ) : (
                  <img src={require('../../assets/images/logo.png')} alt="logo" />
                )}
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <DropdownMenu menu={menu} />
                </li>
                {headerLink.map((item) => (
                  <li className="header__item" key={item.id}>
                    <Link to={item.slug}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="header__icons">
              {icon.map((item) => (
                <a className="header__icon header__icon_social " href={item.slug} key={item.id} rel="noopener">
                  <img src={`https://merlinsbeard.ru/${item.logo}`} alt={item.title} />
                </a>
              ))}
              <a className="header__icon" href="tel:8888888">
                <img src={phone} alt="icon phone" />
              </a>

              {isAuthenticated ? (
                <button className="header__icon header__logout" onClick={() => handleLogoutClick()}>
                  Выход
                </button>
              ) : (
                ''
              )}

              {!isLoggedIn ? (
                <button
                  className="header__icon"
                  onClick={() => {
                    handleIconClick();
                  }}
                >
                  <img src={user} alt="icon user" />
                </button>
              ) : (
                <Link to={'/account/'} className="header__icon">
                  <img src={user} alt="user-account" />
                </Link>
              )}

              <button className="header__burger-button header__icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {' '}
                <img src={burger} alt="burger" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menu={menu} icon={icon} />
      <PopupAccount
        isPopupAccountOpen={isPopupAccountOpen}
        setIsPopupAccountOpen={setIsPopupAccountOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <PopupLogout
        isPopupLogoutOpen={isPopupLogoutOpen}
        setIsPopupLogoutOpen={setIsPopupLogoutOpen}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </>
  );
}

export default Header;
