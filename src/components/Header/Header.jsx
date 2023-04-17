import React,{useState} from 'react';
import './Header.scss';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';
import burger from '../../assets/icon/burger.svg';
import Overlay from '../Overlay/Overlay';


function Header (props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

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
                    <li className="header__item"><DropdownMenu /></li>
                    <li className="header__item"><Link to="#!">Расписание</Link></li>
                    <li className="header__item"><Link to="#!">Блог</Link></li>
                    <li className="header__item"><Link to="#!">Оплата</Link></li>
                </ul>
              </nav>
              <div className="header__icons">
                <a href="tel:8888888"><img src={phone} alt="icon phone"/></a>
                <Link to="#!"><img src={user} alt="icon user"/></Link>
                <button className={`header__burger-button ${isMenuOpen ? 'header__burger-button--active' : ''}`}   onClick={() => {handleMenuClick()}}> <img src={burger} alt="burger" /></button>
              </div>
            </div>
        </div>    
    </header>
    <Overlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;