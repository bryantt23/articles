import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/article_actions';
import { Category, Status } from '../../constants/Enums';

function Articles(props) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [selectedStatus, setSelectedStatus] = useState('Any');

  useEffect(() => {
    async function fetchData() {
      const data = await props.fetchArticles();
      setArticles(data.articles);
    }
    fetchData();
  }, []);

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

      {articlesFiltered.length === 0
        ? 'There are no articles'
        : articlesFiltered.map(article => (
            <ArticlePreview key={article._id} article={article} />
          ))}
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    articles: Object.values(state.articles)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
