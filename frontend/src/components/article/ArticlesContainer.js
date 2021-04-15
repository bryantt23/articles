import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../../actions/article_actions';
import { connect } from 'react-redux';
import Articles from '../article/Articles';
import withLoadingSpinner from '../shared/withLoadingSpinner';

// I am using the original Articles component as the argument
const ArticlesWithLoadingSpinner = withLoadingSpinner(Articles);

function ArticlesContainer(props) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    // this function was in Articles but moved here
    // Articles is now just for presentation
    async function fetchData() {
      const data = await props.fetchArticles();
      console.log(data);
      setArticles(data.articles);
    }
    fetchData();
  }, []);

  // returning a component, the props is how the component gets the data
  return <ArticlesWithLoadingSpinner data={articles} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);
