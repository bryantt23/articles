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
  // const res = useFetch(() => getArticle(id).response);
  const { response, error, loader } = useFetch(() => getArticle(id));
  console.log('response', response);
  console.log('loader', loader);
  // console.log(typeof response);
  const [article, setArticle] = useState(response);
  console.log(article);
  useEffect(() => {
    console.log(typeof response);
    setArticle(response);
  }, [response]);
  const [selectedLabels, setSelectedLabels] = useState(new Set());
  console.log('userId', userId);

  console.log(article);
  /*
  useEffect(() => {
    console.log(id);
    async function fetchData() {
      try {
        const article = await getArticle(id);
        console.log('article', article);
        setArticle(article);
        console.log('article', article);

        setSelectedLabels(new Set(article.labels));
        console.log(selectedLabels);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
*/
  return (
    <div className='App'>
      {JSON.stringify(article)}
      {article.length === 0 ? (
        loader
      ) : !article.data ? (
        `There is no article with id ${id}`
      ) : (
        <div>
          <h1>Article</h1>
          <p>Title: {article.data.title}</p>
          <p>Description: {article.data.description}</p>
          <p>Status: {article.data.status}</p>
          <p>Category: {article.data.category}</p>
          <p>Labels: {JSON.stringify(article.data.labels)}</p>
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
          <p>Is Deleted?: {article.data.isDeleted ? 'Yes' : 'No'}</p>
          {isArticleAuthor(userId, article.data.author) && (
            <NavLink
              to={`/edit-article/${article.data._id}`}
              activeClassName='active'
            >
              Edit article
            </NavLink>
          )}

          <Comments
            comments={article.data.comments}
            articleId={article.data._id}
          />
        </div>
      )}
    </div>
  );
}
/*

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
    

*/
const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.session.user.id
  };
};
const ConnectedArticle = connect(mapStateToProps, null)(Article);

export default ConnectedArticle;
