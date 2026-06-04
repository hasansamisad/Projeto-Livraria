# 💻 Livraria - Frontend Web

Esta é a aplicação de interface para o ecossistema da Livraria, desenvolvida em React.js com foco em alta performance, reatividade e experiência do usuário (UX) moderna. O projeto implementa controle de rotas dinâmicas, notificações assíncronas e uma Store global robusta utilizando Redux Toolkit.

---

## 🛠️ Tecnologias e Bibliotecas Core

* **React.js (Vite):** Ambiente de desenvolvimento ultrarrápido com Hot Module Replacement (HMR).
* **Redux Toolkit (RTK):** Solução moderna para gerenciamento de estado global centralizado, utilizada para gerenciar as preferências do usuário de forma reativa e integrada.
* **React Redux:** Conexão oficial entre a árvore de componentes React e a Store global através de Hooks (`useSelector`, `useDispatch`).
* **React Router Dom:** Roteamento declarativo no client-side com componentes dinâmicos e controle de parâmetros de URL (`useParams`).
* **Tailwind CSS:** Framework utilitário utilizado para criar um design de alta fidelidade, responsivo e com visual moderno focado em modo escuro (*Dark Mode*).
* **React Toastify:** Sistema de feedbacks visuais na tela para ações de sucesso, alertas de erro da API e confirmações síncronas.

---

## 📐 Decisões de Arquitetura e Fluxo de Dados

### 1. Centralização do Estado Global com RTK
Para substituir o fluxo tradicional e repetitivo de leitura de disco (`localStorage`) distribuído entre componentes isolados, foi arquitetado o **`userPreferencesSlice`**. 
* **Inicialização Segura:** O estado nasce realizando uma checagem síncrona no `localStorage` do navegador para carregar listas de livros já favoritados e lidos.
* **Reatividade em Tempo Real:** Componentes irmãos como o `CardLivro` (na listagem geral) e a tela de `DetalhesLivro` consomem simultaneamente a mesma fonte de dados via `useSelector`. Qualquer alteração dispara um `dispatch` que atualiza toda a aplicação de forma reativa e instantânea, sem necessidade de recarregamentos (*F5*).
* **Consistência de Tipagem:** Tratamento preventivo de dados forçando IDs numéricos (`Number(id)`) para evitar conflitos de igualdade entre o retorno de string das rotas e os dados originais da API.

### 2. Consumo Assíncrono da API
Isolamento das requisições através do serviço encapsulado do Axios, gerenciando estados de carregamento (`loading`), respostas de erro customizadas vindas do Express e renderização condicional defensiva.

---

## 📂 Estrutura de Pastas (Frontend)

```text
├── src/
│   ├── components/
│   │   ├── form/          # Componentes reutilizáveis de input e validação
│   │   ├── layouts/       # Estruturas padrão de páginas (Navbar, Footers)
│   │   └── ui/            # Elementos visuais isolados (CardLivro, TabelaDados)
│   ├── config/            # Configurações globais e de ambiente
│   ├── contexts/          # Contextos nativos do React (Ex: AuthContext)
│   ├── hooks/             # Custom Hooks reutilizáveis
│   ├── pages/             # Páginas/Telas principais (HomeCatalogo, DetalhesLivro, Admin)
│   ├── routes/            # Configuração de rotas e rotas privadas (PrivateRoute)
│   ├── services/          # Conexão e instância da API cliente (Axios)
│   ├── store/             # 🧠 Central do Redux Toolkit (store.js e Slices)
│   ├── App.jsx            # Componente raiz com o aninhamento de Providers globais
│   └── main.jsx           # Ponto de entrada do ecossistema React/Vite
├── .env.example           # Modelo para variáveis de ambiente
├── .gitignore             # Bloqueio de segurança (ignora node_modules e arquivos .env locais)
└── Dockerfile             # Configuração da imagem do container de desenvolvimento
```

## Como Executar o Frontend

**Modo 1: Via Docker Compose (Recomendado)**
Se você estiver na raiz do projeto completo, o frontend subirá automaticamente junto com o backend:

```bash
docker compose up -d
```

**Modo 2: Execução Isolada Local**
Caso queira rodar apenas o frontend na sua máquina física:

* 1- Certifique-se de estar dentro da pasta correta:

```bash
cd livraria-frontend
```

* 2- Instale as dependências do projeto:

```bash
npm install
```

* 3- Crie e configure o seu arquivo .env com base no .env.example:

```bash
VITE_API_URL=http://localhost:3000
```

* 4- Inicie o servidor de desenvolvimento do Vite: 
```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173.

## Desenvolvedor
Hasan Sami Sad — Ciência da Computação.