import {  useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { CardLivro } from "../../components/ui/CardLivro";
import { FiltrosCatalogo } from "../../components/ui/FiltroCatalogo";

import { AuthContext } from "../../contexts/AuthContext";

const LIMIT = 8;

export function HomeCatalogo() {
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authorsList, setAuthorsList] = useState([]);

  // Busca inicial de autores
  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await api.get("/authors");
        setAuthorsList(Array.isArray(response.data) ? response.data : []);
      } catch {  
        setAuthorsList([]);
      }
    }
    fetchAuthors();
  }, []);

  // Único efeito: monitora a página e as variáveis de filtro
  useEffect(() => {
    async function fetchBooks() {
      try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        setError("");

        let url = `/books?page=${page}&limit=${LIMIT}`;

        if (search) url += `&search=${encodeURIComponent(search.trim())}`;
        if (selectedGenre) url += `&genre=${encodeURIComponent(selectedGenre.trim())}`;
        if (selectedAuthor) url += `&authorId=${encodeURIComponent(selectedAuthor.trim())}`;

        const response = await api.get(url);
        const fetchedBooks = Array.isArray(response.data) 
          ? response.data 
          : response.data?.rows || [];

        if (page === 1) {
          setBooks(fetchedBooks);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...fetchedBooks]);
        }

        setHasMore(fetchedBooks.length === LIMIT);
      } catch {
        setBooks([]);
        setError("Não foi possível carregar o catálogo de livros. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    fetchBooks();
  }, [page, search, selectedGenre, selectedAuthor]); 

  // Handlers para os filtros: atualiza o termo e zera a página no mesmo evento
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setPage(1);
  };

  const handleAuthorChange = (value) => {
    setSelectedAuthor(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Principal do Catálogo */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-8 mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Acervo da Livraria
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Explore os livros disponíveis no nosso banco de dados.
            </p>
          </div>
          <div>
              { user ? (
                <Link 
                  to="/admin"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg"
                >
                  Acessar Painel Admin
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg"
                >
                  Login para Administrar
                </Link>
              )}
          </div>
        </div>

        {/* Seção de Filtros */}
        
        <FiltrosCatalogo 
          search={search}
          selectedGenre={selectedGenre}
          selectedAuthor={selectedAuthor}
          authorsList={authorsList}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onAuthorChange={handleAuthorChange}
        />

        {/* Loading Principal */}
        {loading && page === 1 && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400 text-sm animate-pulse">Buscando livros no acervo...</p>
            </div>
          </div>
        )}

        {/* Estado de Erro */}
        {error && !loading && (
          <div className="max-w-xl mx-auto bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Estado de Catálogo Vazio / Sem Resultados nos Filtros */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-800 border-dashed max-w-2xl mx-auto">

            {search && !selectedGenre && !selectedAuthor && (
              <>
                <p className="text-slate-400 text-lg font-medium">Nenhum livro encontrado com o título "{search}".</p>
                <p className="text-slate-500 text-sm mt-1">Verifique a ortografia ou tente buscar por outro termo.</p>
              </>
            )}

            {selectedGenre && !selectedAuthor && (
              <>
                <p className="text-slate-400 text-lg font-medium">Não há nenhum livro associado ao gênero "{selectedGenre}" no momento.</p>
                <p className="text-slate-500 text-sm mt-1">Explore outras categorias ou remova o filtro para ver todo o acervo.</p>
              </>
            )}

            {selectedAuthor && !selectedGenre && (
              <>
                <p className="text-slate-400 text-lg font-medium">O autor selecionado não possui nenhum livro cadastrado.</p>
                <p className="text-slate-500 text-sm mt-1">Tente selecionar outro escritor ou limpe os filtros.</p>
              </>
            )}

            {/* Caso o usuário tenha misturado múltiplos filtros e não ache nada */}
            {((selectedGenre && selectedAuthor) || (search && (selectedGenre || selectedAuthor))) && (
              <>
                <p className="text-slate-400 text-lg font-medium">Nenhum resultado corresponde à combinação de filtros aplicada.</p>
                <p className="text-slate-500 text-sm mt-1">Tente remover ou alterar alguns dos critérios de busca.</p>
              </>
            )}

            {/* Catálogo totalmente vazio no banco (Sem filtros ativos) */}
            {!search && !selectedGenre && !selectedAuthor && (
              <>
                <p className="text-slate-400 text-lg font-medium">Nenhum livro cadastrado até o momento.</p>
                <p className="text-slate-500 text-sm mt-1">Faça login no painel para registrar o primeiro exemplar.</p>
              </>
            )}
          </div>
        )}

        {/* Grade de Livros */}
        {!loading && books.length > 0 && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
              {books.map((book) => (
                <CardLivro key={book.id} book={book} />
              ))}
            </div>

            {/* Botão de Carregar Mais */}
            {hasMore && !error && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center justify-center min-w-[200px] rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 px-6 py-3.5 text-sm font-semibold text-indigo-400 hover:text-white transition-all duration-200 active:scale-[0.98] shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                      Carregando...
                    </div>
                  ) : (
                    "Carregar Mais Livros"
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}