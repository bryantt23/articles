export const getArticles = async () => {
  const response = await fetch('/api/articles');
  const body = await response.json();
  return body;
};
