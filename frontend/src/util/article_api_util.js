import axios from 'axios';

export const getArticles = async () => {
  const response = await fetch('/api/articles');
  const body = await response.json();
  return body;
};

export const getArticle = async id => {
  const response = await axios.get(`/api/articles/${id}`);
  console.log(response);
  const body = await response.data;
  console.log(body);
  return body[0];
};

export const addArticle = async ({ title, category, status, description }) => {
  return axios.post('/api/articles/', {
    title,
    category,
    status,
    description
  });
};
