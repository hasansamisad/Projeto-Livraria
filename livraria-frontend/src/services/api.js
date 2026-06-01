import axios from 'axios';

export const api = axios.create({
  // URL do seu container backend mapeado no Docker para a máquina local
  baseURL: 'http://localhost:3001', 
});