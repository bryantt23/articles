import React, { useState } from 'react';
import { Category, Status } from '../../constants/Enums';
import {
  notificationArticle,
  notificationError
} from '../../actions/notification_actions';
import { connect } from 'react-redux';
import { addArticle } from '../../util/article_api_util';

function AddArticle(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(Object.values(Category)[0]);
  const [status, setStatus] = useState(Object.values(Status)[0]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await addArticle({ title, category, status, description });
      console.log(title);
      console.log(category);
      console.log(status);
      console.log(description);

      await props.notificationArticle(
        `You updated a new article with content of:
        Title: ${title}, 
      Description: ${description}, 
      Category: ${category},
      Status: ${status}`,
        10
      );
      props.history.push('/');
    } catch (error) {
      console.log(JSON.stringify(error.response.data));
      // const errors = error.response.data.errors
      //   .map(obj => {
      //     let errors = [];
      //     for (let key in obj) {
      //       errors.push(key + ': ' + obj[key]);
      //     }
      //     return errors;
      //   })
      //   .join(', ');
      props.notificationError(
        error.message + ', Message: ' + error.response.data.errors,
        10
      );
    }
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

const mapDispatchToProps = { notificationArticle, notificationError };

const ConnectedAddArticle = connect(null, mapDispatchToProps)(AddArticle);

export default ConnectedAddArticle;
