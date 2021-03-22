import React, { useEffect, useState } from 'react';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import { fetchArticles } from '../../actions/article_actions';

function Articles(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await props.fetchArticles();
      setArticles(data.articles);
      console.log(props);
    }
    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Articles</h1>

      {articles.length === 0
        ? 'There are no articles'
        : articles.map(article => (
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
