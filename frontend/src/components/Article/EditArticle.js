import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Category, Status } from '../../constants/Enums';
import {
  notificationArticle,
  notificationError
} from '../../actions/notification_actions';
import { connect } from 'react-redux';
import { getArticle, editArticle } from '../../util/article_api_util';
import labels from '../../constants/Labels';

function EditArticle(props) {
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(new Set());

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
        setSelectedLabels(new Set(article.labels));
        console.log(selectedLabels);
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
        labels: [...selectedLabels],
        isDeleted
      });
      await props.notificationArticle(
        `You updated the article to:
        Title: ${title}, 
        Description: ${description}, 
        Category: ${category},
        Status: ${status},
        Selected Labels: ${[...selectedLabels]},
        isDeleted: ${isDeleted}`,
        10
      );
      props.history.push('/');
    } catch (error) {
      console.log(error);
      props.notificationError(
        error.message + ', Message: ' + error.response.data.errors,
        10
      );
    }
  };

  const setCheckbox = (index, isChecked) => {
    if (isChecked) {
      setSelectedLabels(new Set([...selectedLabels, labels[index]]));
      console.log(selectedLabels);
    } else {
      const updatedLabels = [...selectedLabels].filter(
        elem => elem !== labels[index]
      );

      setSelectedLabels(new Set(updatedLabels));
      console.log(selectedLabels);
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
            Selected Labels:
            {labels.map((label, i) => (
              <span>
                <input
                  type='checkbox'
                  checked={selectedLabels.has(label)}
                  onChange={e => setCheckbox(i, e.target.checked)}
                ></input>
                {label} 
              </span>
            ))}
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

const mapDispatchToProps = { notificationArticle, notificationError };

const ConnectedEditArticle = connect(null, mapDispatchToProps)(EditArticle);

export default ConnectedEditArticle;
