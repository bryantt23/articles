import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/article_actions';
import { Category, Status } from '../../constants/Enums';

function Articles(props) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Any');

  useEffect(() => {
    async function fetchData() {
      const data = await props.fetchArticles();
      setArticles(data.articles);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log('hi', selectedCategory);
  // }, [selectedCategory]);

  const createDropdown = (arr, onChangeFunction) => {
    let arrUpdated = Object.values(arr).map(val => val);
    arrUpdated.unshift('Any');
    return (
      <select onChange={e => onChangeFunction(e.target.value)}>
        {arrUpdated.map((key, val) => {
          return <option>{key}</option>;
        })}
      </select>
    );
  };

  console.log(Category);
  console.log(articles);
  let articlesFiltered = articles;
  console.log(selectedCategory);
  if (selectedCategory !== 'Any') {
    articlesFiltered = articles.filter(
      article => article.category === selectedCategory
    );
  }
  console.log('articlesFiltered', articlesFiltered);

  return (
    <div className='App'>
      <h1>Articles</h1>

      <p>Show only articles with Category:</p>
      {createDropdown(Category, setSelectedCategory)}

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
