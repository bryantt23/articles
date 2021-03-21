import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('fetchData');
      const response = await fetch('/api/articles');
      console.log(response);
      const body = await response.json();
      console.log(body);
      setArticles(body);
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Articles</h1>
      {articles.length > 0 &&
        articles.map(article => <ArticlePreview article={article} />)}
    </div>
  );
}

export default Articles;
