# Livraria Full Stack

Uma aplicação web completa para gerenciamento de catálogo de livros, controle de leituras e persistência de preferências do usuário. O projeto foi desenvolvido utilizando uma arquitetura robusta dividida em um backend em Node.js com banco de dados relacional e um frontend reativo moderno, totalmente integrados através de contêineres Docker.

---

## Tecnologias Utilizadas

### Frontend
* **React.js & Vite:** Estrutura ágil para renderização e SPA (Single Page Application).
* **Redux Toolkit (RTK):** Gerenciamento de estado global centralizado e reativo para controle de livros favoritos e lidos.
* **React Router Dom:** Gerenciamento avançado de rotas dinâmicas e navegação interna.
* **Tailwind CSS:** Estilização utilitária moderna com suporte nativo a temas escuros.
* **React Toastify:** Notificações profissionais e alertas síncronos na interface do usuário.

### Backend & Banco de Dados
* **Node.js & Express:** API RESTful escalável para gerenciamento das regras de negócio.
* **Sequelize (ORM):** Abstração de queries e mapeamento de dados relacional para tabelas de Livros, Autores e Capas.
* **MySQL / PostgreSQL:** Armazenamento seguro de dados com relacionamentos complexos.

### Infraestrutura & Ferramentas
* **Docker & Docker Compose:** Containerização de todo o ecossistema (Frontend, Backend e Banco de Dados) para garantir consistência em ambientes de desenvolvimento e produção.

---

## Arquitetura e Funcionalidades Principais

* **Gerenciamento de Estado Centralizado (Single Source of Truth):** Uso do Redux Toolkit para acompanhar se um livro foi marcado como "Lido" ou adicionado aos "Favoritos". A store sincroniza os dados síncronamente na memória RAM para reatividade instantânea entre componentes (`HomeCatalogo`, `CardLivro` e `DetalhesLivro`) e persiste as informações no `localStorage`.
* **Consumo de API Dinâmico:** Telas de detalhes isoladas alimentadas via hooks e carregamento assíncrono baseado em parâmetros de rota (`useParams`).
* **Infraestrutura Pronta para Escalar:** Configuração automatizada via Multi-Container Docker, permitindo subir o banco de dados e os serviços web isolados com apenas um comando.

---

##  Como Executar o Projeto

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/hasansamisad/Projeto-Livraria.git](https://github.com/hasansamisad/Projeto-Livraria.git)
cd Projeto-Livraria
```

## Configurar Variáveis de Ambiente

Verifique e configure os arquivos .env dentro das pastas livraria-frontend e livraria-api com suas credenciais locais (Portas, chaves de API e conexões de banco).

## Subir a Aplicação com Docker

Na raiz do projeto (onde está o arquivo docker-compose.yml), execute o comando abaixo para construir as imagens e iniciar os serviços em segundo plano:

```bash
docker compose up -d --build
```

## Acessar a Aplicação

Assim que o Docker inicializar os serviços, as plataformas estarão disponíveis em:

* **Frontend:** http://localhost:5173

* **API Backend:** http://localhost:3000

## 📂 Estrutura do Repositório

```text
├── livraria-api/          # Servidor Node.js, Sequelize ORM e Models (Backend)
├── livraria-frontend/     # Aplicação React, Redux Store e Componentes Tailwind (Frontend)
│   ├── src/
│   │   ├── components/    # Elementos de UI isolados (CardLivro, TabelaDados)
│   │   ├── pages/         # Telas da aplicação (HomeCatalogo, DetalhesLivro, Login)
│   │   ├── store/         # Configuração central do Redux Toolkit (Slices e Store)
│   │   └── routes/        # Arquitetura de rotas do React Router Dom
└── docker-compose.yml     # Orquestração dos containers de desenvolvimento
```

## Autor

Desenvolvido por Hasan Sami Sad

Estudante de Ciência da Computação e Desenvolvedor Full Stack focado na construção de aplicações escaláveis e modernas.
