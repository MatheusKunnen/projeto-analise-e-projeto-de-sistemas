import axios from 'axios';

const api = axios.create({
  baseURL: ' http://localhost:5000/', //Servidor Local;
});

export default api;
