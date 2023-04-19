import React, {useState} from 'react';
import './Overlay.scss';
import { Link } from 'react-router-dom';
import iconclose from '../../assets/icon/burger-close.svg';
import icon from '../../assets/icon/dropdown-icon.svg';
import phone from '../../assets/icon/Phone.svg';
import user from '../../assets/icon/User.svg';

function Overlay(props) {
    const { isMenuOpen, setIsMenuOpen, data } = props;
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

    const linkUp = data.filter(item => item.position === "u");
    const dropdownLink = linkUp.filter(item => item.children.length !== 0); //массивы с children
    const headerLink = linkUp.filter(item => item.children.length === 0); //пункты хедера без тренировок


    return (
    <div className={`overlay ${isMenuOpen ? 'overlay--open' : ''}`} >
        <div className="overlay__container">
            <div className="overlay__header">
                <div className="overlay__logo">
                    <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <img src={iconclose} alt="close" onClick={handleClose}/>
            </div>
            <div className="overlay__content">
              <nav className="overlay__nav">
                  <button className="accordion__btn" onClick={handleToggle}>
                  {dropdownLink.length > 0 && (<p className="accordion__title">{dropdownLink[0].title}</p>)}
                      <img src={icon} alt="Меню" className={isOpen ? 'dropdown__menu_open' : 'dropdown__menu_close'} />
                  </button>
                  {dropdownLink && dropdownLink.map((item) => (
                    <ul key={item.slug} className={`accordion ${isOpen ? 'active' : ''}`}>
                      {item.children.map((child) => (
                        <li className="accordion__item" key={child.slug}><Link to="#!">{child.title}</Link></li>
                      ))}
                    </ul> 
                  ))}
                    <ul className="overlay__list">
                        {headerLink.map((item) => (
                          <li className="overlay__item" key={item.id}><Link to={item.slug}>{item.title}</Link></li>  ))}
                    </ul>
              </nav>
              <div className="overlay__icons">
                <a href="tel:8888888"><img src={phone} alt="icon phone"/></a>
                <Link to="#!"><img src={user} alt="icon user"/></Link>
              </div>
            </div>
        </div>
    </div>
    );
  }
  

  export default Overlay;
