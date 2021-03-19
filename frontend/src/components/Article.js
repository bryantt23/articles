import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Article() {
  const [article, setArticle] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      try {
        console.log('fetchData');
        const response = await axios.get(`/api/articles/${id}`);
        console.log(response);
        const body = await response.data;
        console.log(body);
        setArticle(body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Article</h1>
      {JSON.stringify(article)}

      {/* {article.length > 0 &&
        article.map(article => (
          <p key={article.id}>{JSON.stringify(article)}</p>
        ))} */}
    </div>
  );
}

export default Article;
