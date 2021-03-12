import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3001/articles');
      const data = await res.json();
      setArticles(data);
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Articles</h1>
      {articles.length > 0 &&
        articles.map(article => <p>{JSON.stringify(article)}</p>)}
    </div>
  );
}

export default App;
