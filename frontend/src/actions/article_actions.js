import { getArticles } from '../util/article_api_util';

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

export const receiveArticles = articles => ({
  type: RECEIVE_ARTICLES,
  articles
});

export const fetchArticles = () => dispatch =>
  getArticles()
    .then(articles => dispatch(receiveArticles(articles)))
    .catch(err => console.log(err));
