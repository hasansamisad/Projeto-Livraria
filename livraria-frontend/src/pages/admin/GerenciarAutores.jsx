import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FormAutor } from "../../components/form/FormAutor";
import { TabelaDados } from "../../components/ui/TabelaDados";
import { toast } from "react-toastify";

export function GerenciarAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gatilho simples para forçar o useEffect a rodar novamente quando mudar
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Estados para controle do formulário de criação/edição
  const [showForm, setShowForm] = useState(false);
  const [autorParaEditar, setAutorParaEditar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAutores = async () => {
    try {
      setLoading(true);
      const response = await api.get("/authors");
      setAutores(Array.isArray(response.data) ? response.data : []);
    } catch  {
      toast.error("Não foi possível carregar os autores. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
    fetchAutores();
  }, [refreshTrigger]);

  // Função simples para atualizar a tabela de qualquer lugar
  const recarregarTabela = () => setRefreshTrigger(prev => prev + 1);

  const handleCriarAutor = () => {
    setAutorParaEditar(null);
    setShowForm(true);
  };

  const handleEditarAutor = (autor) => {
    setAutorParaEditar(autor);
    setShowForm(true);
  };

  const handleSalvarAutor = async (dadosForm) => {
    try {
      setIsSubmitting(true);

      if (autorParaEditar) {
        // Editar autor existente
        await api.put(`/authors/${autorParaEditar.id}`, dadosForm);
        toast.success("Autor atualizado com sucesso!");
      } else {
        // Criar novo autor
        await api.post("/authors", dadosForm);
        toast.success("Autor cadastrado com sucesso!");
      }

      setShowForm(false);
      setAutorParaEditar(null);
      recarregarTabela(); // Atualiza a tabela após salvar
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao salvar os dados do autor.";
      toast.error(`${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletarClick = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este autor? Isso pode afetar os livros vinculados a ele.")) {
      return;
    }

    try {
      await api.delete(`/authors/${id}`);
      toast.success("Autor excluído com sucesso!");
      recarregarTabela(); 
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao excluir o autor. Verifique se ele possui livros vinculados.";
      toast.error(msg);
    }
  };

  const handleCancelar = () => {
    setShowForm(false);
    setAutorParaEditar(null);
  };

  // Configuração das colunas para passar para o componente TabelaDados
  const colunas = [
    { label: "Nome", key: "name" },
    { label: "Nacionalidade", key: "nationality" },
    { 
      label: "Data de Nasc.", 
      key: "birth_date",
      render: (autor) => autor.birth_date ? new Date(autor.birth_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Não informada"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Topo da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Gerenciar Autores</h1>
          <p className="text-sm text-slate-400 mt-1">
            Cadastre, edite ou remova os escritores que compõem o catálogo da sua livraria.
          </p>
        </div>
        
        {/* Só exibe o botão se o formulário estiver fechado */}
        {!showForm && (
          <button
            onClick={handleCriarAutor} 
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
          >
             Adicionar Autor
          </button>
        )}
      </div>

      {/* EXIBIÇÃO CONDICIONAL: OU MOSTRA O FORMULÁRIO OU MOSTRA A LISTA */}
      {showForm ? (
        <div className="max-w-xl mx-auto py-4">
          <FormAutor
            key={autorParaEditar ? `editar-${autorParaEditar.id}` : "novo-autor"}
            autorParaEditar={autorParaEditar}
            onSubmit={handleSalvarAutor}
            onCancelar={handleCancelar}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <div className="bg-slate-850 rounded-2xl border border-slate-800 p-4 shadow-md">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm animate-pulse">Carregando autores...</p>
            </div>
          ) : (
            <TabelaDados
              columns={colunas}
              data={autores}
              onEdit={handleEditarAutor} 
              onDelete={handleDeletarClick}
              emptyMessage="Nenhum autor cadastrado até o momento."
            />
          )}
        </div>
      )}

    </div>
  );
}