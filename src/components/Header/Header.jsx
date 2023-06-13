import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Files
import './Header.scss';
import headerLogo from './logo.png';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';
import burger from '../../assets/icon/burger.svg';

// Components
import DropdownMenu from './DropdownMenu/DropdownMenu';
import Social from '../Social/Social';
import Overlay from '../Overlay/Overlay';
import PopupAccount from '../PopupAccount/PopupAccount';
import PopupLogout from '../PopupLogout/PopupLogout';

// Context
import { IsLoggedInContext } from '../App/App';
import { MenuAndIconsContext } from '../App/App';

function Header() {
  const { isLoggedIn } = useContext(IsLoggedInContext); // Use user state context
  const { menu } = useContext(MenuAndIconsContext); // Use app menu context

  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const [isPopupLogoutOpen, setIsPopupLogoutOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();

  // Пункты хедера с позицией "u" и без тренировок
  const headerMenu = menu.filter(({ position, children }) => position === 'u' && children.length === 0);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]); //проверка на авторизацию пользователя

  const [isSmallScreen, setIsSmallScreen] = useState(window.matchMedia('(max-width: 1300px)').matches);

  useEffect(() => {
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
        <div className="container">
          <div className="header__content">
            <div className="header__logo">
              <Link to="/">
                <img src={headerLogo} alt="logo" title="logo" />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <DropdownMenu menu={menu} />
                </li>

                {headerMenu.map((item) => (
                  <li className="header__item" key={item.id}>
                    <Link to={item.slug}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header__icons">
              <Social />

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

      <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menu={menu} />
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
