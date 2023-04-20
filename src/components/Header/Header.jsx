import React,{useState} from 'react';
import './Header.scss';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';
import burger from '../../assets/icon/burger.svg';
import Overlay from '../Overlay/Overlay';
import telegram from '../../assets/icon/telegram-header.svg';

function Header ({menu, icon} ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkUp = menu.filter(item => item.position === "u"); //пункты хедера с позицией u
  const headerLink = linkUp.filter(item => item.children.length === 0); //пункты хедера без тренировок
  
  function handleMenuClick() {
    if (isMenuOpen ){
      setIsMenuOpen(false); 
    } else {
      setIsMenuOpen(true); 
    }
  }

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.matchMedia("(max-width: 1300px)").matches
  );
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");
    const handleScreenChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);


  return (
    <>
    <header className='header'>
        <div className="header__wrapper">
            <div className="header__content">
              <div className="header__logo">
                {isSmallScreen ?(<img src={require("../../assets/images/logo-2.png")} alt="logo" />) : ( <img src={require("../../assets/images/logo.png")} alt="logo" />)} 
              </div>
              <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__item"><DropdownMenu  menu={menu}/></li>
                    {headerLink.map((item) => (
                       <li className="header__item" key={item.id}><Link to={item.slug}>{item.title}</Link></li>  ))}
                </ul>
              </nav>
              <div className="header__icons">
                {icon.map((item) => (
                  <a className="header__icon header__icon_social " href={item.slug} target="_blank"><img src={`https://merlinsbeard.ru/${item.logo}`} alt={item.title}/></a>
                ))}
                <a className="header__icon" href="tel:8888888"><img src={phone} alt="icon phone"/></a>
                <Link className="header__icon" to="#!"><img src={user} alt="icon user"/></Link>
                <button className="header__burger-button header__icon"  onClick={() => {handleMenuClick()}}> <img src={burger} alt="burger" /></button>
              </div>
            </div>
        </div>    
    </header>
    <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  menu={menu} icon={icon}/>
    </>
  );
};

export default Header;