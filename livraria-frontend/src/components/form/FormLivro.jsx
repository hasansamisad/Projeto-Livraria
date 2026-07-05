import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button"; 
import PropTypes from "prop-types";

export function FormLivro({ livroParaEditar, autoresDisponiveis, onSubmit, onCancelar, isSubmitting }) {
  const [title, setTitle] = useState(livroParaEditar?.title || "");
  const [genre, setGenre] = useState(livroParaEditar?.genre || "");
  const [release_year, setReleaseYear] = useState(livroParaEditar?.release_year || livroParaEditar?.releaseYear || "");
  const [author_id, setAuthorId] = useState(livroParaEditar?.author_id || livroParaEditar?.authorId || "");
  const [pages, setPages] = useState(livroParaEditar?.pages || "");
  const [bookFile, setBookFile] = useState(null); 
  const [urlExterna, setUrlExterna] = useState(livroParaEditar?.cover_url || ""); 
  const [synopsis, setSynopsis] = useState(livroParaEditar?.synopsis || "");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBookFile(e.target.files[0]);
      setUrlExterna(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (title.trim().length < 2) {
      setError("O título do livro deve ter pelo menos 2 caracteres.");
      return;
    }

    if (!author_id) {
      setError("Por favor, selecione um autor para vincular a este livro.");
      return;
    }

    if (!pages || parseInt(pages, 10) <= 0) {
      setError("O número de páginas deve ser um valor positivo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre || "Não especificado");
    formData.append("release_year", release_year ? parseInt(release_year, 10) : "");
    formData.append("author_id", parseInt(author_id, 10));
    formData.append("pages", parseInt(pages, 10));
    formData.append("synopsis", synopsis);
    
    if (bookFile) {
      formData.append("cover", bookFile); 
    } else if (urlExterna.trim()) {
      formData.append("url_externa", urlExterna.trim());
    }

    onSubmit(formData);
  };

 return (
  <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-xl max-w-lg mx-auto animate-fadeIn transition-colors duration-200">
    
    <div className="mb-6">
      <h3 className="text-xl font-bold text-app-text">
        {livroParaEditar ? "✍️ Editar Livro" : "➕ Adicionar Novo Livro"}
      </h3>
      <p className="text-xs text-app-muted mt-1">
        Preencha a ficha técnica da obra para disponibilizá-la no acervo.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-500 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Seus inputs filhos já herdam automaticamente a estilização do tema! */}
      <Input
        label="Título do Livro"
        id="book-title"
        placeholder="Ex: Dom Casmurro"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Select de Autor Vinculado */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="book-author" className="text-xs font-semibold text-app-muted uppercase tracking-wider">
          Autor Vinculado <span className="text-red-500">*</span>
        </label>
        <select
          id="book-author"
          value={author_id}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text placeholder-app-muted/60 shadow-xs outline-hidden transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
        >
          <option value="" disabled hidden className="bg-app-surface text-app-muted">
            -- Selecione um autor da lista --
          </option>
          {autoresDisponiveis.map((autor) => (
            <option key={autor.id} value={autor.id} className="bg-app-surface text-app-text">
              {autor.name} ({autor.nationality || "Nacionalidade N/A"})
            </option>
          ))}
        </select>
      </div>

      {/* Bloco de Imagem de Capa */}
      <div className="border border-app-border p-4 rounded-xl space-y-4 bg-app-bg/30">
        <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block">
          Imagem de Capa
        </span>

        <Input
          label="Opção 1: Link/URL da Imagem externa"
          id="book-url-cover"
          placeholder="Ex: https://imagens.com/livro.jpg"
          value={urlExterna}
          onChange={(e) => {
            setUrlExterna(e.target.value);
            if (e.target.value) setBookFile(null); 
          }}
          disabled={!!bookFile} 
        />

        <div className="text-center text-xs font-semibold text-app-muted/50 my-1">OU</div>

        {/* Upload de Arquivo Físico */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="book-cover" className="text-xs font-semibold text-app-muted">
            Opção 2: Upload de arquivo físico (.jpg, .png)
          </label>
          <input
            id="book-cover"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!!urlExterna} 
            className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-2.5 text-sm text-app-muted file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:transition-colors file:cursor-pointer disabled:opacity-40"
          />
        </div>
      </div>

      <Input
        label="Número de Páginas"
        id="book-pages"
        type="number"
        placeholder="Ex: 256"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        min="1"
        required
      />

      <Input
        label="Gênero Literário"
        id="book-genre"
        placeholder="Ex: Romance, Ficção Científica, Drama"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <Input
        label="Ano de Lançamento"
        id="book-year"
        type="number"
        placeholder="Ex: 1899"
        value={release_year}
        onChange={(e) => setReleaseYear(e.target.value)}
        min="1"
        max={new Date().getFullYear().toString()}
      />

      {/* Textarea de Sinopse */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="book-synopsis" className="text-xs font-semibold text-app-muted uppercase tracking-wider">
          Sinopse / Resumo da Obra
        </label>
        <textarea
          id="book-synopsis"
          rows="4"
          placeholder="Digite uma breve sinopse ou resumo marcante sobre a história do livro..."
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          className="w-full rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text placeholder-app-muted/60 shadow-xs outline-hidden transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-y min-h-[100px]"
        />
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" isLoading={isSubmitting}>
          {livroParaEditar ? "Salvar Alterações" : "Cadastrar Livro"}
        </Button>

        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 justify-center rounded-lg bg-app-bg border border-app-border px-4 py-3 text-sm font-semibold text-app-text hover:bg-app-bg/80 transition-all duration-200 cursor-pointer text-center"
          >
            Cancelar
          </button>
        )}
      </div>

    </form>
  </div>
); 
}

FormLivro.propTypes = {
  livroParaEditar: PropTypes.object,
  autoresDisponiveis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelar: PropTypes.func,
  isSubmitting: PropTypes.bool,
};