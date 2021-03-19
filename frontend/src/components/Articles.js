import React, { useEffect, useState } from 'react';

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
        articles.map(article => (
          <p key={article._id}>{JSON.stringify(article)}</p>
        ))}
    </div>
  );
}

export default Articles;
