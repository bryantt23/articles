import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getArticle } from '../../util/article_api_util';
import Comments from '../comment/Comments';
import labels from '../../constants/Labels';
import { isArticleAuthor } from '../../util/article_util';
import useFetch from '../shared/useFetch';

function Article({ userId }) {
  let { id } = useParams();
  const { response, error, loader } = useFetch(() => getArticle(id));
  console.log(response, error);
  const [article, setArticle] = useState(response);
  const [selectedLabels, setSelectedLabels] = useState(new Set());

  useEffect(() => {
    setArticle(response.data);
  }, [response]);

  useEffect(() => {
    setArticle(error);
  }, [error]);

  return (
    <div className='App'>
      {error ? (
        <p>{JSON.stringify(error)}</p>
      ) : !article || article.length === 0 ? (
        loader
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
          {isArticleAuthor(userId, article.author) && (
            <NavLink
              to={`/edit-article/${article._id}`}
              activeClassName='active'
            >
              Edit article
            </NavLink>
          )}

          <Comments comments={article.comments} articleId={article._id} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.session.user.id
  };
};
const ConnectedArticle = connect(mapStateToProps, null)(Article);

export default ConnectedArticle;
