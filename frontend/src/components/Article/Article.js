import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { getArticle } from '../../util/article_api_util';

function Article() {
  const [article, setArticle] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      try {
        const article = await getArticle(id);
        console.log(article);
        setArticle(article);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      {!article ? (
        `There is no article with id ${id}`
      ) : (
        <div>
          <h1>Article</h1>
          <p>Title: {article.title}</p>
          <p>Description: {article.description}</p>
          <p>Status: {article.status}</p>
          <p>Category: {article.category}</p>
          <p>Is Deleted?: {article.isDeleted ? 'Yes' : 'No'}</p>
          <NavLink to={`/edit-article/${article._id}`} activeClassName='active'>
            Edit article
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Article;
