import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes/routes';

export default function App() {
  return (
    <AuthProvider>
      {/* Notificações profissionais na tela */}
      <ToastContainer autoclose={3000} position="top-right" theme="dark"/>

      {/* O RouterProvider injeta a estrutura de rotas atualizada */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}