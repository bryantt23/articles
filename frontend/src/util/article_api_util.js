import axios from 'axios';

export const getArticles = async () => {
  const response = await fetch('/api/articles');
  const body = await response.json();
  return body;
};

export const addArticle = async ({ title, category, status, description }) => {
  return axios.post('/api/articles/', {
    title,
    category,
    status,
    description
  });
};
