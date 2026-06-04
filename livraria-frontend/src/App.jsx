import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/index';

import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes/routes';

export default function App() {
  return (

    <Provider store={store}>
      <AuthProvider>
        {/* Notificações profissionais na tela */}
        <ToastContainer autoclose={3000} position="top-right" theme="dark"/>

      {/* O RouterProvider injeta a estrutura de rotas atualizada */}
      <RouterProvider router={router} />
    </AuthProvider>
    </Provider>
  );
}