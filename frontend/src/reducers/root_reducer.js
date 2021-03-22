import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import articles from './articles_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  articles
});

export default RootReducer;
