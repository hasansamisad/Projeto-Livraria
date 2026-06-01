import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify"; 

import { Button } from "../../components/form/Button";
import { Input } from "../../components/form/Input";

export function CadastroUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Dispara os dados para o seu backend Express (/user)
      await api.post("/user", { name, email, password });
      
      toast.success("🚀 Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {
      //  Captura os formatos de erro mais comuns do Sequelize/Express
      const errosDoBackend = err.response?.data?.errors;
      const erroSimples = err.response?.data?.error;

      if (errosDoBackend && errosDoBackend.length > 0) {
        const primeiraMsg = errosDoBackend[0];
        // Traduz caso o Sequelize retorne erro de e-mail único em inglês
        if (primeiraMsg.toLowerCase().includes("email") && primeiraMsg.toLowerCase().includes("unique")) {
          toast.error(" Este e-mail já está cadastrado.");
        } else {
          toast.error(` ${primeiraMsg}`);
        }
      } else if (erroSimples) {
        if (erroSimples.toLowerCase().includes("já existe") || erroSimples.toLowerCase().includes("already exists")) {
          toast.error("📧 Este e-mail já está em uso.");
        } else {
          toast.error(`⚠️ ${erroSimples}`);
        }
      } else {
        toast.error("Erro ao cadastrar usuário. Tente novamente mais tarde.");
      }
      
      console.error("Erro completo capturado:", err);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-800 p-8 shadow-xl">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Criar sua conta</h2>
          <p className="text-sm text-slate-400 mt-1">Cadastre-se para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 🧹 O bloco de erro antigo sumiu daqui, deixando a UI muito mais limpa! */}
          
          <Input 
            label="Nome Completo" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          
          <Input 
            label="E-mail" 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <Input 
            label="Senha" 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <Input 
            label="Confirmar Senha" 
            id="confirmPassword" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />

          <Button type="submit">Cadastrar Conta</Button>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Já tem uma conta? Faça login aqui
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}