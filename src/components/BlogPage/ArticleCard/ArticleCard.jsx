import React,{useState} from 'react';
import './ArticleCard.scss';


function ArticleCard (props) {
  const [articleStates, setArticleStates] = useState({
    index: {
      expanded: false,
    },
  });

    const { article } = props;
    const handleExpand = () => {
      const newArticleStates = { ...articleStates };
      newArticleStates.index.expanded = !newArticleStates.index.expanded;
      setArticleStates(newArticleStates);
    };

    //формат даты
    const createdAt = article.created_at;
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    const formattedDate = `${day}.${month}.${year}`;

    return (
      <div className="article-card">
        <img className="article-card__image" src={`https://merlinsbeard.ru/${article.image}`} alt="article" />

        <div className="article-card__container">
          <h2 className="article-card__title">{article.title}</h2>
          <p className="article-card__date">{formattedDate}</p>
{/*           
          <div className={`article-card__content  ${articleStates.index.expanded ? 'expanded' : ''}`}>
            {article.content}
          </div> */}
          <div dangerouslySetInnerHTML={{__html: article.content}} className={`article-card__content  ${articleStates.index.expanded ? 'expanded' : ''}`}></div>
          <button className='article-card__btn' onClick={handleExpand }>
            {articleStates.index.expanded  ? 'Скрыть' : 'Посмотреть всё'}
        </button>
        </div>

      </div>
  );
};

export default ArticleCard ;