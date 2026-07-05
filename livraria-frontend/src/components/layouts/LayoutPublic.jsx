import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export function LayoutPublico() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    //  Layout Base: Utiliza os Design Tokens dinâmicos do Tailwind v4
    <div className="flex flex-col min-h-screen bg-app-bg text-app-text transition-colors duration-200">
      
      {/* BARRA DE NAVEGAÇÃO (HEADER) */}
      {/*  Estrutura limpa: Fundo e bordas reagem automaticamente via CSS Variables */}
      <header className="sticky top-0 z-50 bg-app-surface/80 backdrop-blur-md border-b border-app-border shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Nome da Livraria */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Sami Books
                </span>
              </Link>
            </div>

            {/* Links de Navegação da Direita */}
            <nav className="flex items-center gap-4">

              {/* Verifica se o operador está autenticado */}
              {user ? (
                <div className="flex items-center gap-3">
                  {/* text-app-muted assume a cor secundária correta do tema ativo */}
                  <span className="text-xs text-app-muted font-medium hidden sm:inline">
                    Olá, <strong className="text-indigo-500 dark:text-indigo-400">{user.name}</strong>
                  </span>
                  
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 px-3 py-1.5 text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    Painel Admin
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors cursor-pointer px-2 py-2"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200 shadow-xs cursor-pointer"
                >
                  Entrar
                </Link>
              )}

              {/* Divider Visual sutil mapeado com as bordas dinâmicas do tema */}
              <div className="h-5 w-px bg-app-border"></div>

              {/* Botão de Alternar Tema */}
              <button 
                onClick={toggleTheme}
                aria-label="Alternar tema visual"
                className="p-2 rounded-xl border border-app-border text-app-muted hover:bg-app-bg transition-colors cursor-pointer text-sm"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

            </nav>

          </div>
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      {/* RODAPÉ (FOOTER) */}
      <footer className="bg-app-surface border-t border-app-border text-app-muted py-6 text-center text-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© {new Date().getFullYear()} Sami Books. Todos os direitos reservados.</p>
          <p className="text-xs opacity-80">
            Desenvolvido como projeto prático de Full Stack Development.
          </p>
        </div>
      </footer>

    </div>
  );
}