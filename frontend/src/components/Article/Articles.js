import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { Category, Status } from '../../constants/Enums';

function Articles(props) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('Any');

  useEffect(() => {
    setArticles(props.data);
  }, [articles]);

  const createDropdown = (arr, onChangeFunction) => {
    let arrUpdated = Object.values(arr).map(val => val);
    arrUpdated.unshift('Any');
    return (
      <select onChange={e => onChangeFunction(e.target.value)}>
        {arrUpdated.map(key => {
          return <option>{key}</option>;
        })}
      </select>
    );
  };

  let articlesFiltered = articles;
  if (selectedCategory !== 'Any') {
    articlesFiltered = articles.filter(
      article => article.category === selectedCategory
    );
  }
  if (selectedStatus !== 'Any') {
    articlesFiltered = articlesFiltered.filter(
      article => article.status === selectedStatus
    );
  }
  console.log(articlesFiltered);

  return (
    <div className='App'>
      <h1>Articles</h1>

      <p>Show only articles with Category:</p>
      {createDropdown(Category, setSelectedCategory)}

      <p>Show only articles with Status:</p>
      {createDropdown(Status, setSelectedStatus)}

      <p>Articles Count: {articlesFiltered.length}</p>

      {articlesFiltered.length === 0
        ? 'There are no articles'
        : articlesFiltered.map(article => (
            <ArticlePreview key={article._id} article={article} />
          ))}
    </div>
  );
}

export default Articles;
