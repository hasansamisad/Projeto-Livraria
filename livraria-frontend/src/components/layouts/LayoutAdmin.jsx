import { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export function LayoutAdmin() {
  const { logout, user } = useContext(AuthContext);
   const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Serve para sabermos qual aba está ativa e destacar no menu

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Função simples para verificar se a rota está ativa e mudar a cor do botão
  const isActive = (path) => location.pathname === path;

  return (
  <div className="flex h-screen bg-app-bg text-app-text overflow-hidden transition-colors duration-200">
    
    {/* SIDEBAR (BARRA LATERAL FIXA) */}
    <aside className="w-64 bg-app-surface border-r border-app-border flex flex-col justify-between shadow-xl transition-colors duration-200">
      
      {/* Topo da Sidebar: Logo e Usuário */}
      <div>
        <div className="h-16 flex items-center px-6 border-b border-app-border bg-app-bg/30">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Sami Admin
            </span>
          </Link>
        </div>

        {/* Info do Usuário Logado */}
  
        <div className="p-4 mx-4 my-4 bg-app-bg/50 rounded-xl border border-app-border">
          <p className="text-xs text-app-muted uppercase font-semibold tracking-wider">Operador</p>
          <p className="text-sm font-medium text-app-text truncate mt-0.5">
            {user?.name || "Administrador"}
          </p>
        </div>

        {/* Links de Navegação */}
        <nav className="px-4 space-y-1">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/admin")
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-app-muted hover:bg-app-bg hover:text-app-text"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/books"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/admin/books")
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-app-muted hover:bg-app-bg hover:text-app-text"
            }`}
          >
            Gerenciar Livros
          </Link>

          <Link
            to="/admin/authors"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/admin/authors")
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-app-muted hover:bg-app-bg hover:text-app-text"
            }`}
          >
             Gerenciar Autores
          </Link>

          <Link
            to="/admin/perfil"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive("/admin/perfil")
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                : "text-app-muted hover:bg-app-bg hover:text-app-text"
            }`}
          >
             Meu Perfil
          </Link>
        </nav>
      </div>

      {/* Rodapé da Sidebar: Botão de Sair */}
      <div className="p-4 border-t border-app-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
        >
          Sair do Sistema
        </button>
      </div>

    </aside>

    {/* ÁREA PRINCIPAL DO CONTEÚDO */}
    <div className="flex-1 flex flex-col overflow-hidden">
      
      {/* Barra Superior de Status (Header Interno) */}
      <header className="h-16 bg-app-surface border-b border-app-border flex items-center justify-between px-8 shadow-xs transition-colors duration-200">
        <div className="text-xs font-medium text-app-muted">
          Painel Geral / {location.pathname.replace("/admin", "").replace("/", "") || "Início"}
        </div>
        <div className="flex items-center gap-4">
          <button 
                onClick={toggleTheme}
                aria-label="Alternar tema visual"
                className="p-2 rounded-xl border border-app-border text-app-muted hover:bg-app-bg transition-colors cursor-pointer text-sm"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
          <Link 
            to="/" 
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
          >
             Ver Site Público
          </Link>
        </div>
      </header>

      {/* Conteúdo da Página Privada (Onde o Dashboard vai renderizar) */}
      <main className="flex-grow overflow-y-auto p-8 bg-app-bg transition-colors duration-200">
        <Outlet />
      </main>

    </div>

  </div>
);
}