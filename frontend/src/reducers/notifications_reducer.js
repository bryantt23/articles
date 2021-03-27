import {
  HIDE_NOTIFICATION,
  NOTIFICATION_ARTICLE
} from '../actions/notification_actions';

// https://github.com/bryantt23/redux-anecdotes

//TODO: move actions into own file
const initialState = { show: false, message: '' };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ARTICLE:
      const message = action.payload;
      return { ...state, show: true, message, borderColor: 'green' };
    case HIDE_NOTIFICATION:
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

export default notificationReducer;
