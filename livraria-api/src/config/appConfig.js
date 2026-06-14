export default {
  // Se a aplicação estiver na nuvem (Render), usa a URL do
  // backend. Caso contrário, usa o localhost.
  url: process.env.NODE_ENV === 'production'
    ? 'https://projeto-livraria-backend.onrender.com'
    : `http://localhost:${process.env.PORT || 3001}`,
};
