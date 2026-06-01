import { createBrowserRouter } from 'react-router-dom';
import  PrivateRoute  from './PrivateRoute';

// Layouts
import { LayoutPublico } from '../components/layouts/LayoutPublic';
import { LayoutAdmin } from '../components/layouts/LayoutAdmin';

// Páginas Públicas
import { HomeCatalogo } from '../pages/public/HomeCatalogo';
import { DetalhesLivro } from '../pages/public/DetalhesLivro';
import { Login } from '../pages/public/Login';
import { CadastroUsuario } from '../pages/public/CadastroUsuario';

// Páginas Privadas (Admin)
import { Dashboard } from '../pages/admin/Dashboard';
import { GerenciarLivros } from '../pages/admin/GerenciarLivros';
import { GerenciarAutores } from '../pages/admin/GerenciarAutores';
import { PerfilUsuario } from '../pages/admin/PerfilUsuario';

export const router = createBrowserRouter([
  //  ROTAS PÚBLICAS (Envelopadas pelo Layout do Cliente)
  {
    path: '/',
    element: <LayoutPublico />,
    children: [
      { path: '/', element: <HomeCatalogo /> },
      { path: '/book/:id', element: <DetalhesLivro /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <CadastroUsuario /> },
    ]
  },
  
  //  ROTAS PRIVADAS (Envelopadas pela Proteção + Layout Admin)
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      { path: '/admin', element: <Dashboard /> },
      // CRUD de Livros
      { path: '/admin/books', element: <GerenciarLivros /> },
      // CRUD de Autores
      { path: '/admin/authors', element: <GerenciarAutores /> },
      // Conta do Usuário
      { path: '/admin/perfil', element: <PerfilUsuario /> },
    ]
  }
    
]);