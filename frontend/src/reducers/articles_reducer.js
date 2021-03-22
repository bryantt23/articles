import { RECEIVE_ARTICLES } from '../actions/article_actions';

const ArticlesReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      console.log(action);
      return { ...state, articles: action.articles };
    default:
      return state;
  }
};

export default ArticlesReducer;
