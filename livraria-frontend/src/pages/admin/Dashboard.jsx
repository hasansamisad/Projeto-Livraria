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
      } catch  {
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
      {/* 🎨 Ajustado: Substituído o text-white por text-app-text para garantir a legibilidade */}
      <h1 className="text-3xl font-extrabold text-app-text tracking-tight">
        Olá, Administrador!
      </h1>
      <p className="text-sm text-app-muted mt-1">
        Bem-vindo ao painel de controle do acervo. Veja o resumo do sistema abaixo.
      </p>
    </div>

    {/* Estado de Erro */}
    {error && (
      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500 dark:text-red-400 font-medium max-w-xl">
        {error}
      </div>
    )}

    {/* GRADE DE CARDS (MÉTRICAS) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      {/* Card: Total de Livros */}
      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-md hover:border-indigo-500/40 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-app-muted uppercase tracking-wider">
              Livros no Acervo
            </span>
            <h2 className="text-4xl font-extrabold text-app-text">
              {loading ? (
                <div className="h-9 w-12 bg-app-bg animate-pulse rounded"></div>
              ) : (
                metrics.booksCount
              )}
            </h2>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-app-border">
          <Link to="/admin/books" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
            Gerenciar livros →
          </Link>
        </div>
      </div>

      {/* Card: Total de Autores */}
      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-md hover:border-emerald-500/40 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-app-muted uppercase tracking-wider">
              Autores Cadastrados
            </span>
            <h2 className="text-4xl font-extrabold text-app-text">
              {loading ? (
                <div className="h-9 w-12 bg-app-bg animate-pulse rounded"></div>
              ) : (
                metrics.authorsCount
              )}
            </h2>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-app-border">
          <Link to="/admin/authors" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
            Gerenciar autores →
          </Link>
        </div>
      </div>

    </div>

  </div>
);
}