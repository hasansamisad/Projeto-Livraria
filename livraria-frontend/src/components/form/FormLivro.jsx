import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button"; 
import PropTypes from "prop-types";

export function FormLivro({ livroParaEditar, autoresDisponiveis, onSubmit, onCancelar, isSubmitting }) {
  const [title, setTitle] = useState(livroParaEditar?.title || "");
  const [genre, setGenre] = useState(livroParaEditar?.genre || "");
  const [release_year, setReleaseYear] = useState(livroParaEditar?.release_year || "");
  const [author_id, setAuthorId] = useState(livroParaEditar?.author_id || "");
  const [pages, setPages] = useState(livroParaEditar?.pages || "");
  const [bookCover, setBookCover] = useState(livroParaEditar?.cover_url || "");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setBookCover(e.target.files[0]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações simples de segurança no Front-end
    if (title.trim().length < 2) {
      setError("O título do livro deve ter pelo menos 2 caracteres.");
      return;
    }

    if (!author_id) {
      setError("Por favor, selecione um autor para vincular a este livro.");
      return;
    }

    if(!pages || parseInt(pages, 10) <= 0) {
      setError("O número de páginas deve ser um valor positivo.");
      return;
    }

    /*
      O Axios é inteligente: quando você passa um objeto FormData como o corpo da requisição, ele automaticamente define o Content-Type como multipart/form-data e monta o boundary correto. 
    */
    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre || "Não especificado");
    formData.append("release_year", release_year ? parseInt(release_year, 10) : "");
    formData.append("author_id", parseInt(author_id, 10));
    formData.append("pages", parseInt(pages, 10));

    if(bookCover) {
      formData.append("bookCover", bookCover);
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-xl max-w-lg mx-auto animate-fadeIn">
      
      {/* Topo do Formulário */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">
          {livroParaEditar ? "✍️ Editar Livro" : "➕ Adicionar Novo Livro"}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Preencha a ficha técnica da obra para disponibilizá-la no acervo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Alerta de Erro Local */}
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Input Título */}
        <Input
          label="Título do Livro"
          id="book-title"
          placeholder="Ex: Dom Casmurro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* SELECT DINÂMICO DE AUTORES */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="book-author" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Autor Vinculado <span className="text-red-500">*</span>
          </label>
          <select
            id="book-author"
            value={author_id}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 shadow-xs outline-hidden transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="" disabled hidden>
              -- Selecione um autor da lista --
            </option>
            {autoresDisponiveis.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.name} ({autor.nationality || "Nacionalidade N/A"})
              </option>
            ))}
          </select>
        </div>

          <div className="flex flex-col gap-1.5">
          <label htmlFor="book-cover" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Capa do Livro (.jpg, .png)
          </label>
          <input
            id="book-cover"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:transition-colors file:cursor-pointer"
          />
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

        {/* Input Género */}
        <Input
          label="Género Literário"
          id="book-genre"
          placeholder="Ex: Romance, Ficção Científica, Drama"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        {/* Input Ano de Lançamento */}
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

        {/* Botões de Ação */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            {livroParaEditar ? "Salvar Alterações" : "Cadastrar Livro"}
          </Button>

          {onCancelar && (
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 justify-center rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer text-center"
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