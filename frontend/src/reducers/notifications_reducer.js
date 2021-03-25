// https://github.com/bryantt23/redux-anecdotes

//TODO: move actions into own file
const initialState = { show: false, message: '' };

let timeoutId;
export const notificationArticle = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION_ARTICLE',
      payload: content
    });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch(notificationHide());
    }, timeout * 1000);
  };
};

export const notificationHide = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ARTICLE':
      const message = action.payload;
      return { ...state, show: true, message };
    case 'HIDE_NOTIFICATION':
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

export default notificationReducer;
