import axios from 'axios';

export const api = axios.create({
  // Tenta ler a variável da nuvem/env; se não existir, usa o localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});