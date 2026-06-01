import { Link } from 'react-router-dom';

export function CardLivro({ book }) {
  const capaUrl = book.BookCovers && book.BookCovers.length > 0 
    ? book.BookCovers[0].url 
    : null;

  return (
    <div className="group flex flex-col justify-between bg-slate-800 rounded-xl overflow-hidden border border-slate-700/60 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300">
      
      {/* Container da Imagem com efeito Hover */}
      <div className="relative aspect-[3/4] bg-slate-900 flex items-center justify-center p-4 overflow-hidden border-b border-slate-700/50">
        {capaUrl ? (
          <img
            src={capaUrl}
            alt={`Capa do livro ${book.title}`}
            className="h-full max-h-[220px] w-auto object-contain rounded shadow-md group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center text-slate-500 italic text-xs">
            <span className="text-4xl mb-1">📖</span>
            Sem capa
          </div>
        )}
        
        {/* Badge do Gênero */}
        {book.genre && (
          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-indigo-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-700">
            {book.genre}
          </span>
        )}
      </div>

      {/* Corpo de Texto do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-white text-base line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {book.Author?.name || "Autor Desconhecido"}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            📚 {book.pages || "?"} páginas
          </p>
        </div>

        {/* Botão de Ação Linkado para a Rota de Detalhes */}
        <Link
          to={`/book/${book.id}`}
          className="w-full text-center rounded-lg bg-slate-700/50 hover:bg-indigo-600 border border-slate-600 hover:border-indigo-500 py-2 text-xs font-semibold text-slate-200 hover:text-white transition-all duration-200"
        >
          Ver Detalhes
        </Link>
      </div>

    </div>
  );
}