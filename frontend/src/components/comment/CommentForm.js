import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../util/article_api_util';
import {
  notificationArticle,
  notificationError
} from '../../actions/notification_actions';

function CommentForm({
  setAddingComment,
  articleId,
  userId,
  notificationArticle,
  notificationError
}) {
  const [comment, setComment] = useState('');

  console.log(articleId);
  console.log(userId);
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(articleId, userId, comment);
    try {
      await addComment(articleId, userId, comment);

      await notificationArticle(
        `You added to articleId ${articleId} comment ${comment}`,
        10
      );
    } catch (error) {
      console.log(error);
      notificationError(error.message, 10);
    }
  };

  return (
    <div>
      Comment Form
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={e => setComment(e.target.value)} />
        <input type='submit' value='Add Comment' />
        <button onClick={() => setAddingComment(false)}>Cancel</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = { notificationArticle, notificationError };

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.session.user.id
  };
};
const ConnectedCommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);

export default ConnectedCommentForm;
