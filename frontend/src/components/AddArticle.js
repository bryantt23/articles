import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, Status } from '../../src/models/Enums';

function AddArticle() {
  useEffect(() => {
    // console.log(Object.values(Category));
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(Object.values(Category)[0]);
  const [status, setStatus] = useState(Object.values(Status)[0]);

  const handleSubmit = e => {
    e.preventDefault();

    axios.post('/api/articles/', { title, category, status, description });
    console.log(title);
    console.log(category);
    console.log(status);
    console.log(description);
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
          <select
            value={category}
            name='category'
            onChange={e => setCategory(e.target.value)}
          >
            {Object.values(Category).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Status:
          <select
            value={status}
            name='status'
            onChange={e => setStatus(e.target.value)}
          >
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
