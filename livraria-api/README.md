# 📚 Livraria API - Backend Professional

Este é o serviço de backend para a gestão de uma livraria, desenvolvido com foco em escalabilidade, segurança e isolamento de ambiente. A aplicação gerencia autores, livros e usuários, contando com um sistema de autenticação via JWT e upload de imagens.

## 🚀 Tecnologias e Ferramentas

* **Runtime:** Node.js (v20+)
* **Linguagem:** JavaScript (com suporte a ES6+ via Sucrase)
* **Framework:** Express
* **ORM:** Sequelize (PostgreSQL)
* **Banco de Dados:** PostgreSQL 18
* **Autenticação:** JSON Web Tokens (JWT) & BCryptJS
* **Infraestrutura:** Docker & Docker Compose
* **Ambiente de Desenvolvimento:** WSL2 (Ubuntu 24.04)

---

## 🏗️ Arquitetura do Projeto

A aplicação segue o padrão **MVC (Model-View-Controller)** para garantir a separação de preocupações e facilitar a manutenção:

* **Models:** Definição das tabelas e regras de negócio dos dados.
* **Controllers:** Lógica de entrada/saída e intermediação entre Models e Rotas.
* **Migrations:** Controle de versão do esquema do banco de dados.
* **Seeds:** Dados populados automaticamente para testes iniciais.

---

## 📦 Configuração e Instalação (Docker-first)

Este projeto foi desenvolvido para rodar inteiramente em containers. Não é necessário instalar Node.js ou PostgreSQL localmente na sua máquina host.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/livraria-backend.git](https://github.com/seu-usuario/livraria-backend.git)
cd livraria-backend
```
### 2. Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto seguindo o modelo abaixo:

```env
DATABASE=livraria
DATABASE_HOST=db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
DATABASE_PORT=5432
DATABASE_DIALECT=postgres

TOKEN_SECRET=seu_secret_aqui
TOKEN_EXPIRATION=1d
```

## 🛠️ Endpoints Principais

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| **POST** | `/users` | Cadastro de novos usuários | Não |
| **POST** | `/tokens` | Login e geração de Token JWT | Não |
| **GET** | `/books` | Listagem de todos os livros | Sim |
| **POST** | `/books/covers` | Upload de capa de livro (Multer) | Sim |

### 3. Subir a Infraestrutura
```bash
# Constrói e inicia os containers em modo background
docker compose up -d
```

### 4. Configurar o Banco de Dados
Execute as migrações e popule o banco com dados de teste:

```bash
docker compose exec app npm run docker:setup
```

## 🛡️ Decisões de Engenharia

* **Isolamento com Docker:** Todo o ambiente (Node + Postgres) é orquestrado via Docker Compose, garantindo paridade de ambiente entre desenvolvimento e produção.

* **Segurança**: As senhas dos usuários são criptografadas com o algoritmo bcrypt antes de serem persistidas.

* **Persistência de Dados:** Utilização de volumes Docker (pg_data) para garantir que os dados do PostgreSQL não sejam perdidos ao reiniciar os containers.

* **Hot Reload:** Integração do Nodemon com volumes de código para refletir alterações em tempo real sem rebuild da imagem.