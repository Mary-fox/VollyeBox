import React, {useState} from 'react';
import "./RulesBlock.scss"
import { items } from '../../../data/rules'
import open from '../../../assets/icon/rules-open.svg'
import close from '../../../assets/icon/rules-close.svg'

function RulesBlock () {

  const [activeIndex, setActiveIndex] = useState(null);
  const itemsLength = items.length;
  const halfItemsLength = Math.ceil(itemsLength / 2); // округляем до ближайшего целого числа вверх

  const firstColumnItems = items.slice(0, halfItemsLength);
  const secondColumnItems = items.slice(halfItemsLength, itemsLength);

  const onTitleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  
    return (
      <div className="rules-block">
        <h2 className='rules-block__title'>Правила школы</h2>
        <div className='rules-block__container'>
          <div className="rules-block__column">
            {firstColumnItems.map((item, index) => (
              <div className={`rules-block__content ${activeIndex === index ? 'open' : ''}`} key={index}>
                <div className="rules-block__header" onClick={() => onTitleClick(index)}>
                  <img src={activeIndex === index ? close : open} alt={activeIndex === index ? 'close' : 'open'} />
                  <h3 className="rules-block__subtitle">
                    {item.title}
                  </h3>
                </div>
                <ul className="rules-block__list">
                  {item.list.map((itemText, listItemIndex) => (
                    <li key={listItemIndex}>{itemText}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rules-block__column">
            {secondColumnItems.map((item, index) => (
              <div className={`rules-block__content ${activeIndex === index + halfItemsLength ? 'open' : ''}`} key={index}>
                <div className="rules-block__header" onClick={() => onTitleClick(index + halfItemsLength)}>
                    <img src={activeIndex === index + halfItemsLength ? close : open} alt={activeIndex === index + halfItemsLength ? 'close' : 'open'} />
                    <h3 className="rules-block__subtitle">
                    {item.title}
                    </h3>
                  </div>
                <ul className="rules-block__list">
                  {item.list.map((itemText, listItemIndex) => (
                    <li key={listItemIndex}>{itemText}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    );
  }
export default RulesBlock;