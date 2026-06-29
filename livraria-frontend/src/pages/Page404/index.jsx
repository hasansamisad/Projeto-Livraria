import { Link, useNavigate } from "react-router-dom";

export function Page404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-slate-100 overflow-hidden relative">
      
      {/* Detalhes de luz de fundo para efeito moderno/Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-lg z-10 animate-fadeIn space-y-6">
        
        {/* Ícone Conceitual / Elemento Visual */}
        <div className="flex justify-center">
          <div className="relative group">
            {/* Efeito luminoso de hover no livro */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition duration-300"></div>
            
            <div className="relative bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-2xl flex items-center justify-center w-24 h-24 text-4xl select-none animate-bounce" style={{ animationDuration: '3s' }}>
              📖
              <span className="absolute -bottom-1 -right-1 text-base bg-red-500/20 text-red-400 border border-red-500/30 rounded-md px-1.5 py-0.5 font-bold font-mono shadow-md">
                404
              </span>
            </div>
          </div>
        </div>

        {/* Textos Principais */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Obra Não Encontrada
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            O índice falhou ou este capítulo ainda não foi escrito. A página que você está tentando acessar não existe no acervo do <span className="text-indigo-400 font-semibold">Sami Admin</span>.
          </p>
        </div>

        {/* Código de Erro Estilizado como Ficha Técnica */}
        <div className="bg-slate-850/60 border border-slate-800/80 rounded-xl p-4 max-w-xs mx-auto font-mono text-left text-xs text-slate-500 space-y-1">
          <p><span className="text-indigo-400">status:</span> 404_NOT_FOUND</p>
          <p><span className="text-purple-400">context:</span> biblioteca_digital</p>
          <p><span className="text-slate-400">message:</span> link_quebrado_ou_inexistente</p>
        </div>

        {/* Botões de Ação Dinâmicos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-md"
          >
            ← Voltar à Página Anterior
          </button>

          <Link
            to="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/20 cursor-pointer text-center"
          >
            Ir para o Dashboard
          </Link>
          
        </div>

      </div>

      {/* Rodapé sutil */}
      <div className="absolute bottom-6 text-[10px] text-slate-600 font-mono tracking-wider select-none">
        SAMI_ADMIN // INDEX_ERROR_HANDLER
      </div>

    </div>
  );
}