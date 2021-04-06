import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({ comments, articleId }) {
  const [addingComment, setAddingComment] = useState(false);

  return (
    <div>
      {comments.length ? (
        <div>
          <h3>Article Comments</h3>
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div>
          <p>There are no comments for this article</p>
        </div>
      )}
      {addingComment ? (
        <CommentForm
          setAddingComment={setAddingComment}
          articleId={articleId}
        />
      ) : (
        <button onClick={() => setAddingComment(true)}>Add a Comment</button>
      )}
    </div>
  );
}

export default Comments;
