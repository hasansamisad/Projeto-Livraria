import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/form/Button";
import { toast } from "react-toastify";

export function PerfilUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  
  // Estados para gerenciamento de senha
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        setLoading(true);
        const response = await api.get("/user/profile");
        
        // Ajuste os campos caso o seu model use 'nome' em vez de 'name'
        setNome(response.data.name || "");
        setEmail(response.data.email || "");
      } catch  {
        toast.error("Não foi possível carregar os dados do seu perfil.");
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, []);

  const handleAtualizarDados = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      await api.put("/user/profile", { 
        name: nome,
        email 
      });
      
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || err.response?.data?.error || "Erro ao atualizar o perfil.";
      toast.error(`${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  //  3. Altera a senha usando o mesmo UserController.update
  const handleAlterarSenha = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.put("/user/profile", {
        password: newPassword,  
      });

      toast.success("Senha alterada com sucesso!");
      
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] || err.response?.data?.error || "Erro ao alterar a senha. Verifique a senha atual.";
      toast.error(`${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm animate-pulse">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Topo da Página */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Meu Perfil</h1>
        <p className="text-sm text-slate-400 mt-1">
          Gerencie suas informações cadastrais e configurações de segurança da conta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: DADOS PESSOAIS */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md h-fit">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white">📋 Dados Pessoais</h3>
            <p className="text-xs text-slate-400 mt-0.5">Mantenha seu nome e e-mail de acesso atualizados.</p>
          </div>

          <form onSubmit={handleAtualizarDados} className="space-y-4">
            <Input
              label="Nome Completo"
              id="profile-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <Input
              label="E-mail de Acesso"
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button type="submit" isLoading={isSubmitting}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>

       {/* CARD 2: ALTERAR SENHA (SEM OLD PASSWORD) */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md h-fit">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white">🔒 Segurança</h3>
            <p className="text-xs text-slate-400 mt-0.5">Defina uma nova senha de acesso ao painel.</p>
          </div>

          <form onSubmit={handleAlterarSenha} className="space-y-4">
            <Input
              label="Nova Senha"
              id="new-password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              label="Confirmar Nova Senha"
              id="confirm-password"
              type="password"
              placeholder="Digite a senha novamente"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button type="submit" isLoading={isSubmitting}>
                Atualizar Senha
              </Button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}