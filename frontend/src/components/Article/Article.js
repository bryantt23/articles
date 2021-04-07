import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getArticle } from '../../util/article_api_util';
import Comments from '../comment/Comments';
import labels from '../../constants/Labels';

function Article() {
  const [article, setArticle] = useState(null);
  const [selectedLabels, setSelectedLabels] = useState(new Set());
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    async function fetchData() {
      try {
        const article = await getArticle(id);
        console.log(article);
        setArticle(article);
        setSelectedLabels(new Set(article.labels));
        console.log(selectedLabels);
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
          <p>Labels: {JSON.stringify(article.labels)}</p>
          <div>
            <p>
              Selected Labels:
              {labels.map((label, i) => (
                <span key={i} style={{ opacity: 0.5 }}>
                  <input
                    type='checkbox'
                    checked={selectedLabels.has(label)}
                    readOnly={true}
                  ></input>
                  {label}
                </span>
              ))}
            </p>
          </div>
          <p>Is Deleted?: {article.isDeleted ? 'Yes' : 'No'}</p>
          <NavLink to={`/edit-article/${article._id}`} activeClassName='active'>
            Edit article
          </NavLink>

          <Comments comments={article.comments} articleId={article._id} />
        </div>
      )}
    </div>
  );
}

export default Article;
