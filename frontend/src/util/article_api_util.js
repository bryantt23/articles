import axios from 'axios';
const baseUrl = '/api/articles';

export const getArticles = async () => {
  const response = await fetch(baseUrl);
  const body = await response.json();
  return body;
};

export const getArticle = async id => {
  const response = await axios.get(baseUrl + '/' + id);
  console.log(response);
  const body = await response.data;
  console.log(body);
  return body[0];
};

export const addArticle = async ({ title, category, status, description }) => {
  return axios.post(baseUrl, {
    title,
    category,
    status,
    description
  });
};
