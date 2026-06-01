import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export function Dashboard() {
  const [metrics, setMetrics] = useState({ booksCount: 0, authorsCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        // Dispara as duas requisições em paralelo para ganhar performance
        const [booksResponse, authorsResponse] = await Promise.all([
          api.get("/books"),
          api.get("/authors"),
        ]);

        const booksData = Array.isArray(booksResponse.data) ? booksResponse.data : [];
        const authorsData = Array.isArray(authorsResponse.data) ? authorsResponse.data : [];

        setMetrics({
          booksCount: booksData.length,
          authorsCount: authorsData.length,
        });
      } catch (err) {
        setError("Erro ao carregar os dados do painel principal.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Mensagem de Boas-vindas */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Olá, Administrador!
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Bem-vindo ao painel de controle do acervo. Veja o resumo do sistema abaixo.
        </p>
      </div>

      {/* Estado de Erro */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 font-medium max-w-xl">
          ⚠️ {error}
        </div>
      )}

      {/*  GRADE DE CARDS (MÉTRICAS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card: Total de Livros */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Livros no Acervo
              </span>
              <h2 className="text-4xl font-extrabold text-white">
                {loading ? (
                  <div className="h-9 w-12 bg-slate-700 animate-pulse rounded"></div>
                ) : (
                  metrics.booksCount
                )}
              </h2>
            </div>
            <div className="p-4 bg-indigo-500/10 text-indigo-400 text-3xl rounded-xl border border-indigo-500/20">
              📚
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/60">
            <Link to="/admin/books" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Gerenciar livros →
            </Link>
          </div>
        </div>

        {/* Card: Total de Autores */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Autores Cadastrados
              </span>
              <h2 className="text-4xl font-extrabold text-white">
                {loading ? (
                  <div className="h-9 w-12 bg-slate-700 animate-pulse rounded"></div>
                ) : (
                  metrics.authorsCount
                )}
              </h2>
            </div>
            <div className="p-4 bg-emerald-500/10 text-emerald-400 text-3xl rounded-xl border border-emerald-500/20">
              ✍️
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/60">
            <Link to="/admin/authors" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Gerenciar autores →
            </Link>
          </div>
        </div>

      </div>

      {/* 🚀 SEÇÃO DE AÇÕES RÁPIDAS */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="text-lg font-bold text-white">Ações Rápidas</h3>
        <p className="text-sm text-slate-400">
          Adicione novos registros ao sistema com apenas um clique:
        </p>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to="/admin/books"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200 shadow-md cursor-pointer"
          >
            ➕ Novo Livro
          </Link>
          <Link
            to="/admin/authors"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-all duration-200 cursor-pointer"
          >
            ➕ Novo Autor
          </Link>
        </div>
      </div>

    </div>
  );
}