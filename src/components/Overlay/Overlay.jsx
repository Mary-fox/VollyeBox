import React, {useState} from 'react';
import './Overlay.scss';
import { Link } from 'react-router-dom';
import iconclose from '../../assets/icon/burger-close.svg';
import icon from '../../assets/icon/dropdown-icon.svg';

function Overlay(props) {
    const { isMenuOpen, setIsMenuOpen } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    function handleClose() {
        if (isMenuOpen ){
          setIsMenuOpen(false); 
        } else {
          setIsMenuOpen(true); 
        }
      }
    return (
    <div className={`overlay ${isMenuOpen ? 'overlay--open' : ''}`} >
        <div className="overlay__container">
            <div className="overlay__header">
                <div className="overlay__logo">
                    <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <img src={iconclose} alt="close" onClick={handleClose}/>
            </div>
            <nav className="overlay__nav">
                <button className="accordion__btn" onClick={handleToggle}>
                    <p className="accordion__title">Тренировки</p>
                    <img src={icon} alt="Меню" className={isOpen ? 'dropdown__menu_open' : 'dropdown__menu_close'} />
                </button>
                <ul className={`accordion ${isOpen ? 'active' : ''}`}>
                    <li className="accordion__item"><Link to="#!">Виды тренировок</Link></li>
                    <li className="accordion__item"><Link to="#!">Уровни</Link></li>
                    <li className="accordion__item"><Link to="#!">Тренера</Link></li>
                    <li className="accordion__item"><Link to="#!">Залы</Link></li>
                </ul> 
                <ul className="overlay__list">
                      <li className="overlay__item"><Link to="#!">Расписание</Link></li>
                      <li className="overlay__item"><Link to="#!">Блог</Link></li>
                      <li className="overlay__item"><Link to="#!">Оплата</Link></li>
                </ul>
            </nav>
            
        </div>
    </div>
    );
  }
  
  export default Overlay;
  


  