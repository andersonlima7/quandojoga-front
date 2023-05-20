import axios from 'axios';

const apiUrl = 'http://localhost:3333/';

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});
