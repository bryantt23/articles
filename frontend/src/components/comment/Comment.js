import React from 'react';

function Comment({ comment }) {
  return (
    <div style={{ border: '1px solid' }}>
      <p>Comment: {comment.text}</p>
      <p>
        by: {comment.author.handle}{' '}
        <a href={`mailto:${comment.author.email}`}>{comment.author.email}</a>
      </p>
    </div>
  );
}

export default Comment;
