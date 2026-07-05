import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/form/Button";
import { Input } from "../../components/form/Input";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      setIsSubmitting(true);
      setError("");
      
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      const serverMessage = err.response?.data?.error || err.response?.data?.errors?.[0]?.message || "Email ou senha inválidos";

      setError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  // 🎨 Ajustado: Fundo geral mapeado para o design token reativo do tema
  <div className="flex min-h-screen items-center justify-center bg-app-bg px-4 transition-colors duration-200">
    {/* 🎨 Ajustado: Caixa centralizada como card flutuante com bg-app-surface e bordas finas */}
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-app-surface p-8 shadow-xl border border-app-border transition-colors duration-200">
      
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        {/* 🎨 Ajustado: Cor do título reativa ao tema ativo */}
        <h2 className="text-3xl font-bold text-app-text tracking-tight">Acesso ao Painel</h2>
        <p className="text-sm text-app-muted mt-2">
          Entre com as suas credenciais de administrador
        </p>
      </div>

      {/* Formulário de Login */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Exibição Condicional de Erros */}
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-500 dark:text-red-400 text-center font-medium animate-pulse">
            {error}
          </div>
        )}
        
        {/* Campo E-mail */}
        {/* 💡 Seus componentes filhos já vão herdar o comportamento de cores dinâmicas! */}
        <Input 
          label="E-mail" 
          id="email" 
          type="email" 
          placeholder="seu-email@exemplo.com"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        {/* Campo Senha */}
        <Input 
          label="Senha" 
          id="password" 
          type="password" 
          placeholder="••••••••"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {/* Botão de Envio com estado de Loading integrado */}
        <Button type="submit" isLoading={isSubmitting}>
          Entrar no Sistema
        </Button>

        {/* Divisor Visual */}
        {/* 🎨 Ajustado: Linhas divisórias e texto "ou" suavizados com as cores semânticas */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-app-border"></div>
          <span className="flex-shrink mx-4 text-app-muted/60 text-xs uppercase tracking-wider">ou</span>
          <div className="flex-grow border-t border-app-border"></div>
        </div>

        {/* Link para a tela de Cadastro Público */}
        <div className="text-center">
          <Link
            to="/register"
            // 🎨 Ajustado: Contraste inteligente (indigo-600 para o claro, indigo-400 para o escuro)
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            Não tem uma conta? Cadastre-se aqui
          </Link>
        </div>

      </form>
    </div>
  </div>
);

  }