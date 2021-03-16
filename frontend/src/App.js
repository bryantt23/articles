import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('fetchData');
      const response = await fetch('/api/articles');
      console.log(response);
      const body = await response.json();
      console.log(body);
      // const res = await axios.get('/articles');
      // console.log(res);
      // const res = await fetch('/articles');
      // const data = await res.json();
      setArticles(body);
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
