import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FormLivro } from "../../components/form/FormLivro"; 
import { TabelaDados } from "../../components/ui/TabelaDados";
import { toast } from "react-toastify";

export function GerenciarLivros() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Estados para controle do formulário de criação/edição
  const [showForm, setShowForm] = useState(false);
  const [livroParaEditar, setLivroParaEditar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    async function carregarDadosPainel() {
      try {
        setLoading(true);

        // Dispara as duas requisições em paralelo (Livros e Autores) para máxima performance
        const [booksResponse, authorsResponse] = await Promise.all([
          api.get("/books"),
          api.get("/authors"),
        ]);

        setLivros(Array.isArray(booksResponse.data) ? booksResponse.data : []);
        setAutores(Array.isArray(authorsResponse.data) ? authorsResponse.data : []);
      } catch  {
        toast.error("Não foi possível carregar os dados do acervo. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    carregarDadosPainel();
  }, [refreshTrigger]);

  // Função para dar o gatilho de atualização na tabela
  const recarregarTabela = () => setRefreshTrigger((prev) => prev + 1);

  const handleCriarLivro = () => {
    setLivroParaEditar(null);
    setShowForm(true);
  };

  const handleEditarLivro = (livro) => {
    setLivroParaEditar(livro);
    setShowForm(true);
  };

  const handleSalvarLivro = async (dadosForm) => {
    try {
      setIsSubmitting(true);

      // 1. Separar o arquivo de imagem dos dados textuais do formulário para a primeira requisição
    const imagemCapa = dadosForm.get("bookCover"); // Captura o arquivo que colocamos no FormData lá no FormLivro

    const dadosLivro = {
      title: dadosForm.get("title"),
      genre: dadosForm.get("genre"),
      release_year: dadosForm.get("release_year"),
      author_id: dadosForm.get("author_id"),
      pages: dadosForm.get("pages"),
    };

    let livroId = livroParaEditar?.id;

      if (livroParaEditar) {
        // Editar livro existente: PUT /books/:id
        await api.put(`/books/${livroParaEditar.id}`, dadosLivro);
        toast.success("Livro atualizado com sucesso!");
      } else {
        // Criar novo livro: POST /books
        const response = await api.post("/books", dadosLivro);
        livroId = response.data.id; // Captura o ID do livro recém-criado para enviar a capa
        toast.success("Livro cadastrado com sucesso!");
      }

      // 2. Se houver uma imagem de capa, enviar em uma requisição separada para o endpoint de upload de capa
      if(imagemCapa && livroId) {
        const coverFormData = new FormData();
        coverFormData.append("cover", imagemCapa); // O nome "cover" deve bater com o que o backend espera
        coverFormData.append("book_id", livroId); // Passamos o ID do livro para associar a capa

        await api.post("/covers", coverFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setShowForm(false);
      setLivroParaEditar(null);
      recarregarTabela();
    } catch (err) {
     const errosDoBackend = err.response?.data?.errors;
    const msg = errosDoBackend && errosDoBackend.length > 0
      ? errosDoBackend[0]
      : err.response?.data?.error || "Erro ao salvar os dados do livro.";

    toast.error(`${msg}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleDeletarClick = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este livro do acervo?")) {
      return;
    }

    try {
      await api.delete(`/books/${id}`);
      toast.success("Livro removido com sucesso!");
      recarregarTabela();
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao excluir o livro.";
      toast.error(msg);
    }
  };

  const handleCancelar = () => {
    setShowForm(false);
    setLivroParaEditar(null);
  };

  // Configuração das colunas para passar para o seu componente TabelaDados
  const colunas = [
    { label: "Título", key: "title" },
    { 
      label: "Autor", 
      key: "author_id",
      // Como o Sequelize devolve o objeto do Autor associado, podemos renderizar o nome dele diretamente
      render: (livro) => livro.Author?.name || "Autor não vinculado"
    },
    { label: "Género", key: "genre" },
    { 
      label: "Ano", 
      key: "release_year",
      render: (livro) => livro.release_year || "N/A"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Topo da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Gerenciar Livros</h1>
          <p className="text-sm text-slate-400 mt-1">
            Controle as obras disponíveis, vincule autores e edite as informações do acervo.
          </p>
        </div>
        
        {!showForm && (
          <button
            onClick={handleCriarLivro}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
          >
             Adicionar Livro
          </button>
        )}
      </div>

      {/* EXIBIÇÃO CONDICIONAL: OU FORMULÁRIO OU LISTA */}
      {showForm ? (
        <div className="max-w-xl mx-auto py-4">
          <FormLivro
            key={livroParaEditar ? `editar-${livroParaEditar.id}` : "novo-livro"}
            livroParaEditar={livroParaEditar}
            autoresDisponiveis={autores} 
            onSubmit={handleSalvarLivro}
            onCancelar={handleCancelar}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <div className="bg-slate-850 rounded-2xl border border-slate-800 p-4 shadow-md">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm animate-pulse">Carregando acervo de livros...</p>
            </div>
          ) : (
            <TabelaDados
              columns={colunas}
              data={livros}
              onEdit={handleEditarLivro}
              onDelete={handleDeletarClick}
              emptyMessage="Nenhum livro cadastrado no acervo até o momento."
            />
          )}
        </div>
      )}

    </div>
  );
}