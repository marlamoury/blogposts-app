import axios from 'axios';

const API_URL = 'http://192.168.15.6:8000/api'; // 🔁 Altere para o IP da sua máquina

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // opcional, tempo de espera de resposta
});

export default api;
