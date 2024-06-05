import axios from 'axios';

const api = axios.create({
  baseURL: 'https://elsaval.com.pe/api/elsaval/',
});

export default api;