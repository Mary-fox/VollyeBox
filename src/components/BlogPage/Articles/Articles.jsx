import React, { useState, useEffect } from 'react';
import Api from '../../Api/Api';
import ArticleCard from '../ArticleCard/ArticleCard';
import ReactPaginate from 'react-paginate';
import './Articles.scss';

function Articles( ) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 3
  const fetchArticles = async (page) => {
    const response = await Api.get(`api/v1/post/?page=${page}`);
    if (response.data && response.data.results) {
      setArticles(response.data.results);
      const totalArticles = response.data.count;
      const totalPages = Math.ceil(totalArticles / PAGE_SIZE);
      setTotalPages(totalPages);
    }
  }

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  return (
    <section className='articles'>
      <h1 className='articles__title'>Блог</h1>
      {articles.map((article) => (
  <ArticleCard key={article.id} article={article} />
))}

<ReactPaginate
  previousLabel={''}
  nextLabel={''}
  breakLabel={'...'}
  pageCount={totalPages}
  marginPagesDisplayed={1}
  pageRangeDisplayed={2}
  onPageChange={(data) => setCurrentPage(data.selected + 1)}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>
      
    </section>
  )
}

export default Articles;