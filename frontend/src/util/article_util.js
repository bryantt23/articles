export const isArticleAuthor = (userId, authorId) => {
  if (authorId == userId) {
    console.log(`  
  article id & user id match
  `);
  } else {
    console.log('article id & user id do NOT match ', authorId, userId);
  }
  return authorId === userId;
};
