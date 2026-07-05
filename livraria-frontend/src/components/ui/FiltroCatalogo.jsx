import PropTypes from "prop-types";

const GENRES = [
  "Ficção Científica", "Fantasia", "Romance", "Terror", 
  "Biografia", "História", "Infantil", "Clássicos", 
  "Literatura", "Distopia", "Aventura", "Mistério", 
  "Thriller", "Poesia", "Autoajuda", "Humor", 
  "Filosofia", "Religião", "Ciência", "Tecnologia"
];

export function FiltrosCatalogo({
  search,
  selectedGenre,
  selectedAuthor,
  authorsList,
  onSearchChange,
  onGenreChange,
  onAuthorChange,
}) {
  return (

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-app-surface p-4 rounded-xl border border-app-border mb-10 shadow-md transition-colors duration-200">
    
    {/* Input de Texto */}
    <div className="md:col-span-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-app-muted mb-1.5">
        Buscar por nome
      </label>
      <input
        type="text"
        placeholder="Digite o título do livro..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg bg-app-bg border border-app-border px-4 py-2.5 text-sm text-app-text placeholder-app-muted/60 focus:outline-none focus:border-indigo-500 transition-colors"
      />
    </div>

    {/* Select de Gênero */}
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-app-muted mb-1.5">
        Gênero
      </label>
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="w-full rounded-lg bg-app-bg border border-app-border px-3 py-2.5 text-sm text-app-text focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
      >
        <option value="" className="text-app-text bg-app-surface">Todos os gêneros</option>
        {GENRES.map((g) => (
          <option key={g} value={g} className="text-app-text bg-app-surface">{g}</option>
        ))}
      </select>
    </div>

    {/* Select de Autor */}
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-app-muted mb-1.5">
        Autor
      </label>
      <select
        value={selectedAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="w-full rounded-lg bg-app-bg border border-app-border px-3 py-2.5 text-sm text-app-text focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
      >
        <option value="" className="text-app-text bg-app-surface">Todos os autores</option>
        {authorsList.map((author) => (
          <option key={author.id} value={author.id} className="text-app-text bg-app-surface">{author.name}</option>
        ))}
      </select>
    </div>

  </div>
);
}

// Boa prática: Validar as Prop Types para o ESLint não chiar
FiltrosCatalogo.propTypes = {
  search: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  selectedAuthor: PropTypes.string.isRequired,
  authorsList: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onAuthorChange: PropTypes.func.isRequired,
};