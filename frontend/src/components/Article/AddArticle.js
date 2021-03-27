import React, { useState } from 'react';
import { Category, Status } from '../../models/Enums';
import { notificationArticle } from '../../actions/notification_actions';
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
      console.log(error);
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

const mapDispatchToProps = { notificationArticle };

const ConnectedAddArticle = connect(null, mapDispatchToProps)(AddArticle);

export default ConnectedAddArticle;
