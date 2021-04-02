import axios from 'axios';
const baseUrl = '/api/users';

export const getUsers = async () => {
  const response = await fetch(baseUrl);
  const body = await response.json();
  return body;
};
