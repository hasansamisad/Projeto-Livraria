import { useState } from "react";
import { Input } from "./Input"; 
import { Button } from "./Button"; 

export function FormAutor({ autorParaEditar, onSubmit, onCancelar, isSubmitting }) {

  const [name, setName] = useState(autorParaEditar ? autorParaEditar.name : "");
  const [nationality, setNationality] = useState(autorParaEditar ? autorParaEditar.nationality : "");
  const [birth_date, setBirthDate] = useState(autorParaEditar ? autorParaEditar.birth_date : "");
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples antes de disparar para a API
    if (name.trim().length < 3) {
      setError("O nome do autor deve ter pelo menos 3 caracteres.");
      return;
    }

    // Passa os dados limpos para a função que a página pai gerencia
    onSubmit({
      name,
      nationality: nationality || "Nacionalidade não especificada",
      birth_date: birth_date || null
    });
  };

  return (
  // 🎨 Ajustado: O container agora usa bg-app-surface e as bordas dinâmicas do tema ativo
  <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-xl max-w-lg mx-auto animate-fadeIn transition-colors duration-200">
    
    {/* Título Dinâmico */}
    <div className="mb-6">
      {/* 🎨 Ajustado: text-app-text substitui o text-white estático */}
      <h3 className="text-xl font-bold text-app-text">
        {autorParaEditar ? "✍️ Editar Autor" : "➕ Cadastrar Novo Autor"}
      </h3>
      <p className="text-xs text-app-muted mt-1">
        Preencha a ficha técnica do autor para o banco de dados.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Alerta de erro local se houver */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-500 dark:text-red-400 font-medium">
           {error}
        </div>
      )}

      {/* Input Nome */}
      {/* 💡 Seus inputs filhos já vão herdar automaticamente o estilo reativo que refatoramos! */}
      <Input
        label="Nome do Autor"
        id="author-name"
        placeholder="Ex: Machado de Assis"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Input Nacionalidade */}
      <Input
        label="Nacionalidade"
        id="author-nationality"
        placeholder="Ex: Brasileira"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />

      {/* Input Data de Nascimento */}
      <Input
        label="Data de Nascimento"
        id="author-birth-date"
        type="date"
        value={birth_date}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      {/* Botões de Ação */}
      <div className="flex items-center gap-3 pt-2">
        
        <Button type="submit" isLoading={isSubmitting}>
          {autorParaEditar ? "Salvar Alterações" : "Cadastrar Autor"}
        </Button>

        {/* Botão de Cancelar */}
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            // 🎨 Ajustado: O botão herda a semântica neutra (estilo o variant secondary/outline do seu Button)
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