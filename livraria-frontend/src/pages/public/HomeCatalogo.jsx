import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { CardLivro } from "../../components/ui/CardLivro";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function HomeCatalogo() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchBooks() {
      try {
      setLoading(true);
      setError("");

      const response = await api.get("/books");
      setBooks(Array.isArray(response.data) ? response.data : []);
        
      } catch  {
        setError("Não foi possível carregar o catálogo de livros. Tente novamente mais tarde.")
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  

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
            {/* Atalho para ir para o login/admin */}
              {user ? (
                <Link 
                  to="/admin" 
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                >
                  Painel Administrativo →
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                >
                  Entrar para Gerenciar →
                </Link>
              )}
          </div>
        </div>

        {/* Estado de Carregamento (Loading) */}
        {loading && (
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

        {/* Estado de Catálogo Vazio */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-800 border-dashed">
            <span className="text-5xl">📭</span>
            <p className="text-slate-400 mt-4 text-lg font-medium">Nenhum livro cadastrado até o momento.</p>
            <p className="text-slate-500 text-sm mt-1">Faça login no painel para registrar o primeiro exemplar.</p>
          </div>
        )}

        {/* Grade de Livros (Grid Responsivo) */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {books.map((book) => (
              <CardLivro key={book.id} book={book} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
