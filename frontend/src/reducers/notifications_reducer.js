// https://github.com/bryantt23/redux-anecdotes

//TODO: move actions into own file
const initialState = { show: false, message: '' };

let timeoutId;
export const notificationUpdateArticle = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION_UPDATE_ARTICLE',
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
  let content, message;

  switch (action.type) {
    case 'NOTIFICATION_UPDATE_ARTICLE':
      content = action.payload;
      message = `You updated article to ${content}`;
      return { ...state, show: true, message };
    case 'HIDE_NOTIFICATION':
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

export default notificationReducer;
