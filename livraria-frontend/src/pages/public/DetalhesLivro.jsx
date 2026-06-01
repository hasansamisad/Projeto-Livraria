import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../services/api";
import { Button } from "../../components/form/Button";

export function DetalhesLivro() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

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
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

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
          
          {/* Coluna da Esquerda: Capa do Livro (Consumindo seu campo Virtual 'url') */}
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
                <p>📖 <span className="font-semibold text-slate-300">Páginas:</span> {book.pages || "Não informado"}</p>
              </div>

              <hr className="border-slate-700" />

              {/* Ficha Técnica do Autor (Se incluído no seu GET /books/:id) */}
              {book.Author ? (
                <div className="bg-slate-900/40 border border-slate-700/60 rounded-xl p-4 space-y-2">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Sobre o Autor
                  </h2>
                  <p className="text-lg font-bold text-white">
                    {book.Author.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    🌍 <span className="text-slate-400">Nacionalidade:</span> {book.Author.nationality}
                  </p>
                  {book.Author.birth_date && (
                    <p className="text-sm text-slate-300">
                      📅 <span className="text-slate-400">Nascimento:</span> {
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

            {/* Ações do Admin ou Fluxo futuro */}
            <div className="pt-8 md:pt-0">
              <Button type="button" onClick={() => alert("Livro consultado com sucesso!")}>
                Marcar como Lido / Favoritar
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}