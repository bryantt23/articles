import React from 'react';
import { NavLink } from 'react-router-dom';

function ArticlePreviewMini({ article }) {
  return (
    <div>
      <p>Title: {article.title}</p>
      <p>Description: {article.description}</p>
      <NavLink to={`/articles/${article._id}`} activeClassName='active'>
        Go to article
      </NavLink>
    </div>
  );
}

export default ArticlePreviewMini;
