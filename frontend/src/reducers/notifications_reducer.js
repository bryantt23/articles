import {
  HIDE_NOTIFICATION,
  NOTIFICATION_ARTICLE,
  NOTIFICATION_ERROR
} from '../actions/notification_actions';

// https://github.com/bryantt23/redux-anecdotes

//TODO: move actions into own file
const initialState = { show: false, message: '' };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ERROR:
      return {
        ...state,
        show: true,
        message: action.payload,
        borderColor: 'RED'
      };
    case NOTIFICATION_ARTICLE:
      return {
        ...state,
        show: true,
        message: action.payload,
        borderColor: 'green'
      };
    case HIDE_NOTIFICATION:
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

export default notificationReducer;
