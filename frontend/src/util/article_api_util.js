import axios from 'axios';
const baseUrl = '/api/articles';

export const getArticles = async () => {
  const response = await fetch(baseUrl);
  const body = await response.json();
  return body;
};

export const getArticlesByUser = async userId => {
  const response = await fetch(`${baseUrl}/author/${userId}`);
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

export const editArticle = async ({
  title,
  category,
  status,
  description,
  isDeleted,
  labels,
  id
}) => {
  return axios.put(baseUrl + '/' + id, {
    title,
    category,
    status,
    description,
    isDeleted,
    labels
  });
};

export const addComment = async (articleId, userId, comment) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment, userId })
  };
  // debugger;
  const url = `${baseUrl}/${articleId}/comments`;
  const response = await fetch(url, requestOptions);
  console.log(response);
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    throw Error(data);
  }

  return data;
};
