import React from 'react';
import Comment from './Comment';

function Comments({ comments }) {
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
    </div>
  );
}

export default Comments;
