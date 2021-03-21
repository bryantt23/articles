import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Category, Status } from '../../models/Enums';

function EditArticle() {
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        const article = await response.data[0];
        const { title, description, category, status, isDeleted } = article;
        setTitle(title);
        setDescription(description);
        setCategory(category);
        setStatus(status);
        setIsDeleted(isDeleted);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    axios.put(`/api/articles/${id}`, {
      title,
      description,
      category,
      status,
      isDeleted
    });
    console.log(title);
    console.log(category);
    console.log(status);
    console.log(description);
  };

  return (
    <div className='App'>
      <h1>Edit Article</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
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
            Is Deleted:
            <input
              name='isDeleted'
              type='checkbox'
              checked={isDeleted}
              onChange={e => {
                e.target.checked ? setIsDeleted(true) : setIsDeleted(false);
              }}
            />
          </label>

          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default EditArticle;