import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, toggleRead } from "../../store/userPreferencesSlice";
import { CardLivro } from "../../components/ui/CardLivro"; 

export function DetalhesLivro() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedGenre, setRelatedGenre] = useState([]); 
  const [relatedAuthor, setRelatedAuthor] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const favoritos = useSelector((state) => state.preferences?.favorites || []);
  const lidos = useSelector((state) => state.preferences?.readBooks || []);

  const isFavorite = book ? favoritos.includes(book.id) : false;
  const isRead = book ? lidos.includes(book.id) : false;

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/books/${id}`);
        const { book, relatedGenre, relatedAuthor } = response.data; 
        setBook(book);
        setRelatedGenre(relatedGenre || []);
        setRelatedAuthor(relatedAuthor || []); 
      } catch (err) {
        const serverMessage = err.response?.data?.error 
          || "Erro ao carregar detalhes do livro";
          console.error("Erro ao buscar detalhes do livro:", err);
        setError(serverMessage);
        toast.error(serverMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  const handleToggleRead = () => {
    if (!book) return;
    dispatch(toggleRead(book.id));
    toast.success(isRead ? "Livro marcado como não lido." : "Livro marcado como lido!");
  };

  const handleToggleFavorite = () => {
    if (!book) return;
    dispatch(toggleFavorite(book.id));
    toast.success(isFavorite ? "Removido dos favoritos." : "Adicionado aos favoritos!");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-xl font-medium animate-pulse">Carregando detalhes do livro...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md text-center">
          <p className="text-red-400 font-semibold mb-4">{error || "Livro inválido"}</p>
          <Link to="/" className="text-indigo-400 hover:underline text-sm">
            Voltar para o catálogo
          </Link>
        </div>
      </div>
    );
  }

  const capaUrl = book.BookCovers && book.BookCovers.length > 0
    ? book.BookCovers[0].url
    : null;

  return (
  <div className="min-h-screen bg-app-bg text-app-text py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* Breadcrumb / Navegação superior */}
      
      <div className="flex items-center space-x-2 text-xs text-app-muted">
        <Link to="/" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Início</Link>
        <span>&gt;</span>
        <span className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors truncate max-w-[120px]">
          {book.Author?.name || "Autor"}
        </span>
        <span>&gt;</span>
        <span className="text-app-text font-medium truncate max-w-[180px]">{book.title}</span>
      </div>

      {/* Card Principal de Detalhes */}

      <div className="bg-app-surface rounded-2xl p-6 md:p-10 shadow-2xl border border-app-border transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LADO ESQUERDO: Capa do Livro */}
          <div className="lg:col-span-4 flex justify-center items-start">
            <div className="bg-app-bg/40 rounded-2xl p-4 border border-app-border/40 shadow-inner w-full flex justify-center max-w-[340px] lg:max-w-full">
              {capaUrl ? (
                <img 
                  src={capaUrl} 
                  alt={`Capa do livro ${book.title}`} 
                  className="w-full h-auto max-h-[480px] object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <div className="aspect-[3/4] w-full bg-app-bg/80 rounded-xl flex flex-col items-center justify-center text-app-muted text-sm italic p-4">
                  <span className="text-5xl mb-3">📖</span>
                  Sem capa cadastrada
                </div>
              )}
            </div>
          </div>

          {/* LADO DIREITO: Informações detalhadas */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Título e Autor */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-app-text tracking-tight">
                  {book.title}
                </h1>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-base mt-2 hover:underline inline-block cursor-pointer">
                  {book.Author?.name || "Autor Desconhecido"}
                </p>
                <p className="text-xs text-app-muted mt-1 flex items-center gap-1">
                  <span>👁️</span> 313 visualizações
                </p>
              </div>

              {/* Sobre a Obra (Sinopse) */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-app-muted">
                  Sobre a obra
                </h2>
                <p className="text-sm text-app-text/90 leading-relaxed text-justify whitespace-pre-line">
                  {book.synopsis || "Sinopse não disponível para este livro."}
                </p>
              </div>

              {/* Botões de Ação Principais */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleToggleRead}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer border md:w-auto w-full ${
                    isRead 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white border-transparent"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white border-transparent"
                  }`}
                >
                  {isRead ? "✓ Lido" : "Emprestar / Ler"}
                </button>

                {/* Botão de Curtida / Favorito */}
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer ${
                    isFavorite
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 shadow-xs"
                      : "bg-app-bg border-app-border text-app-muted hover:text-app-text"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span>17 curtidas</span>
                </button>
              </div>

              {/* Gênero / Badge */}
              <div className="pt-2">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-md border border-indigo-500/20 uppercase tracking-wider">
                   {book.genre || "Clássicos"}
                </span>
              </div>

            </div>

            {/* Grid de Metadados Rodapé (Ficha Técnica Horizontal) */}

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6 border-t border-app-border text-xs text-app-muted">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-app-muted/70">ISBN</span>
                <p className="font-semibold text-app-text truncate">𝄃𝄃𝄂𝄂𝄀𝄁 9786584542211</p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-app-muted/70">Editora</span>
                <p className="font-semibold text-app-text truncate">Pop Stories</p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-app-muted/70">Publicação</span>
                <p className="font-semibold text-app-text">01/05/2022</p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-app-muted/70">Páginas</span>
                <p className="font-semibold text-app-text">{book.pages || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-app-muted/70">Idioma</span>
                <p className="font-semibold text-app-text">Português</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SEÇÕES DE LIVROS RELACIONADOS */}

      {/* Seção 1: Títulos do Mesmo Autor */}
      {relatedAuthor && relatedAuthor.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="pb-1">
            <h2 className="text-2xl font-bold text-app-text tracking-tight">
              Títulos do mesmo autor
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 animate-fadeIn">
            {relatedAuthor.map((relBook) => (
              <CardLivro key={relBook.id} book={relBook} />
            ))}
          </div>
        </div>
      )}

      {/* Seção 2: Títulos Semelhantes (Mesmo Gênero) */}
      {relatedGenre && relatedGenre.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="pb-1">
            <h2 className="text-2xl font-bold text-app-text tracking-tight">
              Títulos semelhantes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 animate-fadeIn">
            {relatedGenre.map((relBook) => (
              <CardLivro key={relBook.id} book={relBook} />
            ))}
          </div>
        </div>
      )}

    </div>
  </div>
);
}