import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        setArticle(body[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Article</h1>
      <p>Title: {article.title}</p>
      <p>Description: {article.description}</p>
      <p>Status: {article.status}</p>
      <p>Category: {article.category}</p>
      <p>Is Deleted?: {article.isDeleted ? 'Yes' : 'No'}</p>
      <Link to={`/edit-article/${article._id}`} activeClassName='active'>
        Edit article
      </Link>
    </div>
  );
}

export default Article;
