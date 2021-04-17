import React from 'react';
import ArticlePreview from './ArticlePreview';

function ArticlePreviewContainer({ articles }) {
  return (
    <div>
      {articles.length === 0
        ? 'There are no articles'
        : articles.map(article => (
            <ArticlePreview key={article._id} article={article} />
          ))}
    </div>
  );
}

export default ArticlePreviewContainer;
