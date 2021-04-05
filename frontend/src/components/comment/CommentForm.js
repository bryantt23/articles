import React, { useState } from 'react';

function CommentForm({ setAddingComment }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <div>
      Comment Form
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={e => setText(e.target.value)} />
        <input type='submit' value='Add Comment' />
        <button onClick={() => setAddingComment(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default CommentForm;
