import React, {useState, useEffect} from 'react';
import "./RulesBlock.scss"
// import { items } from '../../../data/rules'
import open from '../../../assets/icon/rules-open.svg'
import close from '../../../assets/icon/rules-close.svg'
import Api from "../../Api/Api";

function RulesBlock () {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Api.get('api/v1/dynamic-page/?slug=registration')
    .then(response => {
      const blocksData = response.data[0].blocks;
      setBlocks(blocksData);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const itemsLength = blocks.length;
  const halfItemsLength = Math.ceil(itemsLength / 2); // округляем до ближайшего целого числа вверх

  const firstColumnItems = blocks.slice(0, halfItemsLength); //левый столбец правил
  const secondColumnItems = blocks.slice(halfItemsLength, itemsLength); //правый столбец правил

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
                  {JSON.parse(item.style_content).blocks[0].data.items.map((itemText, listItemIndex) => (
                    <li key={listItemIndex}>{itemText.replace(/<\/?[^>]+>/g,"")}</li>
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
                    {JSON.parse(item.style_content).blocks[0].data.items.map((itemText, listItemIndex) => (
                      <li key={listItemIndex}>{itemText.replace(/<\/?[^>]+>/g,"")}</li>
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