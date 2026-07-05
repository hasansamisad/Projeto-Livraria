import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function CardLivro({ book }) {
  const capaUrl = book.BookCovers && book.BookCovers.length > 0 
    ? book.BookCovers[0].url 
    : null;

    const favoritos = useSelector((state) => state.preferences?.favorites || []);
    const lidos = useSelector((state) => state.preferences?.readBooks || []);

    const isFavorite = favoritos.includes(book.id);
    const isRead = lidos.includes(book.id);

  return (
  // 🎨 Ajustado: O card agora usa bg-app-surface e as bordas dinâmicas do tema ativo
  <div className="group flex flex-col justify-between bg-app-surface rounded-xl overflow-hidden border border-app-border shadow-xs hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 relative">
    
    {/* Container da Imagem com efeito Hover */}
    {/* 🎨 Ajustado: O fundo da imagem usa bg-app-bg para criar profundidade interna */}
    <div className="relative aspect-[3/4] bg-app-bg flex items-center justify-center p-4 overflow-hidden border-b border-app-border">
      {capaUrl ? (
        <img
          src={capaUrl}
          alt={`Capa do livro ${book.title}`}
          className="h-full max-h-[220px] w-auto object-contain rounded shadow-md group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="flex flex-col items-center text-app-muted italic text-xs">
          <span className="text-4xl mb-1">📖</span>
          Sem capa
        </div>
      )}
      
      {/* Badge do Gênero (Canto Superior Esquerdo) */}
      {book.genre && (
        <span className="absolute top-3 left-3 bg-app-surface/90 backdrop-blur-xs text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-app-border shadow-xs">
          {book.genre}
        </span>
      )}

      {/* INDICADORES VISUAIS REATIVOS (Canto Superior Direito) */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isRead && (
          <span 
            className="bg-emerald-500/90 text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-md flex items-center gap-1 border border-emerald-400/20"
            title="Você já leu este livro!"
          >
            ✓ LIDO
          </span>
        )}
        
        {isFavorite && (
          <div 
            className="bg-rose-500 text-white p-1.5 rounded-md shadow-md flex items-center justify-center border border-rose-400/20"
            title="Livro Favoritado"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        )}
      </div>
    </div>

    {/* Corpo de Texto do Card */}
    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div>
        {/* 🎨 Ajustado: text-app-text substitui o text-white estático */}
        <h3 className="font-bold text-app-text text-base line-clamp-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-app-muted mt-1 font-medium">
          {book.Author?.name || "Autor Desconhecido"}
        </p>
        <p className="text-xs text-app-muted/80 mt-2">
           {book.pages || "?"} páginas
        </p>
      </div>

      {/* Botão de Ação */}
      {/* 🎨 Ajustado: Cores do botão mapeadas com as variáveis semânticas */}
      <Link
        to={`/book/${book.id}`}
        className="w-full text-center rounded-lg bg-app-bg hover:bg-indigo-600 border border-app-border hover:border-indigo-500 py-2 text-xs font-semibold text-app-text hover:text-white transition-all duration-200"
      >
        Ver Detalhes
      </Link>
    </div>

  </div>
);
}