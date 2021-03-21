import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, Status } from '../../src/models/Enums';

function AddArticle() {
  useEffect(() => {
    // console.log(Object.values(Category));
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(title);
    console.log(category);
    console.log(status);
  };

  const handleChange = e => {
    if (e.target.name === 'category') {
      setCategory(e.target.value);
    } else {
      setStatus(e.target.value);
    }
    console.log(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type='text' onChange={e => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type='text' onChange={e => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Select Category:
          <select value={category} name='category' onChange={handleChange}>
            {Object.values(Category).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>{' '}
        </label>
        <br />
        <label>
          Select Status:
          <select value={status} name='status' onChange={handleChange}>
            {Object.values(Status).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>{' '}
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default AddArticle;
