import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

function ArticlePreview({ article }) {
  const text =
    article.description.length <= 20
      ? article.description
      : article.description.substring(0, 17) + '...';
  return (
    <div style={{ border: '1px solid' }}>
      <h3>Title: {article.title}</h3>
      <p>Description: {text}</p>
      <p>Category: {article.category}</p>
      <p>Status: {article.status}</p>
      <Link to={`/articles/${article._id}`} activeClassName='active'>
        Go to article
      </Link>
    </div>
  );
}

export default ArticlePreview;
