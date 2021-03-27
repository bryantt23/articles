import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Category, Status } from '../../models/Enums';
import { notificationArticle } from '../../actions/notification_actions';
import { connect } from 'react-redux';
import { getArticle, editArticle } from '../../util/article_api_util';

function EditArticle(props) {
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const article = await getArticle(id);
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

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await editArticle({
        id,
        title,
        description,
        category,
        status,
        isDeleted
      });
      await props.notificationArticle(
        `You updated the article to:
        Title: ${title}, 
        Description: ${description}, 
        Category: ${category},
        Status: ${status},
        isDeleted: ${isDeleted}`,
        10
      );
      props.history.push('/');
    } catch (error) {
      console.log(error);
    }
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
              value={title || ''}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description || ''}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Select Status:
            <select
              value={status || ''}
              name='status'
              onChange={e => setStatus(e.target.value)}
            >
              {Object.values(Status).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Select Category:
            <select
              value={category || ''}
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

const mapDispatchToProps = { notificationArticle };

const ConnectedEditArticle = connect(null, mapDispatchToProps)(EditArticle);

export default ConnectedEditArticle;
