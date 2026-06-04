import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, toggleRead } from "../../store/userPreferencesSlice";

export function DetalhesLivro() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
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
        setBook(response.data);
      } catch (err) {
        const serverMessage = err.response?.data?.error || "Erro ao carregar detalhes do livro";
        setError(serverMessage);
        toast.error(serverMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  //  Função para Alternar o Status de Leitura
  const handleToggleRead = () => {
    if (!book) return;

    dispatch(toggleRead(book.id));
    toast.success(isRead ? "Livro marcado como não lido." : "Livro marcado como lido!");
  };

    const handleToggleFavorite = () => {
    if (!book) return;
    dispatch(toggleFavorite(book.id));
    toast.success(isFavorite ? "Removido dos favoritos." : "Adicionado os favoritos!");
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
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Botão de voltar */}
        <Link to="/" className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          ← Voltar para o Catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
          
          {/* Coluna da Esquerda: Capa do Livro */}
          <div className="flex justify-center items-center bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-inner">
            {capaUrl ? (
              <img 
                src={capaUrl} 
                alt={`Capa do livro ${book.title}`} 
                className="max-h-[450px] w-auto object-contain rounded-lg shadow-lg transform hover:scale-102 transition-transform duration-300"
              />
            ) : (
              <div className="h-[400px] w-[280px] bg-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-400 text-sm italic p-4 text-center">
                <span className="text-3xl mb-2">📖</span>
                Sem capa cadastrada
              </div>
            )}
          </div>

          {/* Coluna da Direita: Informações Reais do seu Sequelize */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  {book.genre || "Gênero não especificado"}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                  {book.title}
                </h1>
              </div>

              {/* Informações Físicas do Livro */}
              <div className="text-sm text-slate-400">
                <p><span className="font-semibold text-slate-300">Páginas:</span> {book.pages || "Não informado"}</p>
              </div>

              <hr className="border-slate-700" />

              {/* Ficha Técnica do Autor */}
              {book.Author ? (
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Sobre o Autor
                  </h2>
                  <p className="text-lg font-bold text-white">
                    {book.Author.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-400">Nacionalidade:</span> {book.Author.nationality || "Não informada"}
                  </p>
                  {book.Author.birth_date && (
                    <p className="text-sm text-slate-300">
                      <span className="text-slate-400">Nascimento:</span> {
                        new Date(book.Author.birth_date + "T00:00:00").toLocaleDateString('pt-BR')
                      }
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Informações do autor não atreladas a esse livro no backend.
                </p>
              )}
            </div>

            {/* Ações Disponíveis */}
            <div className="pt-8 md:pt-0 flex items-center gap-4 w-full">
              
              {/* Botão de Status de Leitura Dinâmico */}
              <div className="flex-grow">
                {isRead ? (
                  <button
                    type="button"
                    onClick={handleToggleRead}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-5 py-3 text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer hover:bg-emerald-600/30"
                  >
                    <span className="text-base">✓</span> Lido
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleToggleRead}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/20 cursor-pointer border border-transparent"
                  >
                    Marcar como Lido
                  </button>
                )}
              </div>

              {/* Botão de Favorito (Coração Reativo) */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`p-3 h-[46px] w-[46px] rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center flex-shrink-0 ${
                  isFavorite
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-400 scale-105 shadow-md shadow-rose-500/10"
                    : "bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                }`}
                title={isFavorite ? "Remover dos favoritos" : "Favoritar livro"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5 transition-transform duration-200 active:scale-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}