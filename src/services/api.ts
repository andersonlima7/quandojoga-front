import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 3000
});
