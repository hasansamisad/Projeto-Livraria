import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function LayoutPublico() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      
      {/*  BARRA DE NAVEGAÇÃO (HEADER) */}
      <header className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Nome da Livraria */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200"></span>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Sami Books
                </span>
              </Link>
            </div>

            {/* Links de Navegação da Direita */}
            <nav className="flex items-center gap-4">

             {/* Verifica se o operador está autenticado */}
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    Olá, <strong className="text-indigo-400">{user.name}</strong>
                  </span>
                  
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-2 text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-md cursor-pointer"
                  >
                    Painel Admin
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer px-2 py-2"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                // Se for um mero visitante, exibe o botão tradicional de login
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200 shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Entrar
                </Link>
              )}
            </nav>

          </div>
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      {/* RODAPÉ (FOOTER) */}
      <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-500 py-6 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© {new Date().getFullYear()} Sami Books. Todos os direitos reservados.</p>
          <p className="text-xs text-slate-600">
            Desenvolvido como projeto prático de Full Stack Development.
          </p>
        </div>
      </footer>

    </div>
  );
}