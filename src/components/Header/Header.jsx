import React,{useState} from 'react';
import './Header.scss';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';
import burger from '../../assets/icon/burger.svg';
import Overlay from '../Overlay/Overlay';
import telegram from '../../assets/icon/telegram-header.svg';

function Header ({menu} ) {
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

  return (
    <>
    <header className='header'>
        <div className="header__wrapper">
            <div className="header__content">
              <div className="header__logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
              </div>
              <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__item"><DropdownMenu  menu={menu}/></li>
                    {headerLink.map((item) => (
                       <li className="header__item" key={item.id}><Link to={item.slug}>{item.title}</Link></li>  ))}
                </ul>
              </nav>
              <div className="header__icons">
                <a href="#!"><img src={telegram} alt="icon telegram"/></a>
                <a href="tel:8888888"><img src={phone} alt="icon phone"/></a>
                <Link to="#!"><img src={user} alt="icon user"/></Link>
                <button className={`header__burger-button ${isMenuOpen ? 'header__burger-button--active' : ''}`}   onClick={() => {handleMenuClick()}}> <img src={burger} alt="burger" /></button>
              </div>
            </div>
        </div>    
    </header>
    <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  menu={menu}/>
    </>
  );
};

export default Header;