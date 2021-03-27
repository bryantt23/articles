export const NOTIFICATION_ARTICLE = 'NOTIFICATION_ARTICLE';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

let timeoutId;
export const notificationArticle = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: NOTIFICATION_ARTICLE,
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
    type: HIDE_NOTIFICATION
  };
};
