/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // 1. O estado de usuário já inicializa lendo o localStorage de forma síncrona
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading] = useState(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    // Como a verificação acontece no primeiro milissegundo de vida do app,
    // o loading já nasce como false se terminou de ler, sem precisar de useEffect!
    return false;
  });

  const login = async (email, password) => {
    try {
      const response = await api.post('/token', { email, password });
      const { token, user: userData } = response.data;

      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const serverMessage = error.response?.data?.errors?.[0] || 'Erro ao realizar login';
      throw new Error(serverMessage, { cause: error });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext value={{ 
      isAuthenticated: !!user, 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext>
  );
}