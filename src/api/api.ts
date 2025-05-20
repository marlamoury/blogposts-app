import axios from 'axios';

const API_URL = 'http://192.168.15.8:8000/api'; // ✅ use seu IP local aqui

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // ⏱ aumenta para evitar erro de timeout
});

export default api;
