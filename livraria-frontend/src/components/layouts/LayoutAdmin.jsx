import { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function LayoutAdmin() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Serve para sabermos qual aba está ativa e destacar no menu

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Função simples para verificar se a rota está ativa e mudar a cor do botão
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      
      {/*  SIDEBAR (BARRA LATERAL FIXA) */}
      <aside className="w-64 bg-slate-850 border-r border-slate-800 flex flex-col justify-between shadow-xl">
        
        {/* Topo da Sidebar: Logo e Usuário */}
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl"></span>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sami Admin
              </span>
            </Link>
          </div>

          {/* Info do Usuário Logado */}
          <div className="p-4 mx-4 my-4 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Operador</p>
            <p className="text-sm font-medium text-slate-200 truncate mt-0.5">
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
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
               Dashboard
            </Link>

            <Link
              to="/admin/books"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive("/admin/books")
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              Gerenciar Livros
            </Link>

            <Link
              to="/admin/authors"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive("/admin/authors")
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
               Gerenciar Autores
            </Link>
          </nav>
        </div>

        {/* Rodapé da Sidebar: Botão de Sair */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer"
          >
            Sair do Sistema
          </button>
        </div>

      </aside>

      {/*  ÁREA PRINCIPAL DO CONTEÚDO */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Barra Superior de Status (Header Interno) */}
        <header className="h-16 bg-slate-850 border-b border-slate-800 flex items-center justify-between px-8 shadow-xs">
          <div className="text-xs font-medium text-slate-500">
            Painel Geral / {location.pathname.replace("/admin", "").replace("/", "") || "Início"}
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
            >
               Ver Site Público
            </Link>
          </div>
        </header>

        {/* Conteúdo da Página Privada (Onde o Dashboard vai renderizar) */}
        <main className="flex-grow overflow-y-auto p-8 bg-slate-900">
          <Outlet />
        </main>

      </div>

    </div>
  );
}