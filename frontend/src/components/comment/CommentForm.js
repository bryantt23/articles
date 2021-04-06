import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../util/article_api_util';

function CommentForm({ setAddingComment, articleId, userId }) {
  const [comment, setComment] = useState('');

  console.log(articleId);
  console.log(userId);
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(articleId, userId, comment);
    await addComment(articleId, userId, comment);
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

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.session.user.id
  };
};
const ConnectedCommentForm = connect(mapStateToProps, null)(CommentForm);

export default ConnectedCommentForm;
