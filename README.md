# 📚 Sami Books - Livraria Full Stack

Uma aplicação web completa para gerenciamento de catálogo de livros, controle de acervo e gerenciamento administrativo. O projeto foi desenvolvido utilizando uma arquitetura robusta dividida em uma API backend em Node.js com banco de dados relacional e um frontend reativo moderno, totalmente integrados através de contêineres Docker e implantados em nuvem com esteiras automatizadas de CI/CD.

---

## 🖥️ Demonstração do Ecossistema

![Interface Principal do Acervo - Sami Books](https://github.com/user-attachments/assets/ab349b6f-e4b9-4ecd-a4ce-550e8510dd31)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js & Vite:** Estrutura ágil para renderização otimizada e SPA (Single Page Application).
* **React Router Dom:** Gerenciamento avançado de rotas dinâmicas, navegação interna e proteção de rotas privadas.
* **Tailwind CSS:** Estilização utilitária moderna com interface totalmente responsiva em modo escuro.
* **React Toastify:** Notificações síncronas em tempo real e alertas visuais profissionais para a experiência do usuário.

### Backend & Banco de Dados
* **Node.js & Express:** API RESTful escalável orientada a objetos para o processamento das regras de negócio.
* **Sequelize (ORM):** Abstração de queries e mapeamento de dados relacional para tabelas integradas.
* **PostgreSQL / MySQL:** Armazenamento robusto e seguro com aplicação rigorosa de integridade referencial.

### Infraestrutura, DevOps & Ferramentas
* **Docker & Docker Compose:** Containerização de todo o ecossistema (Frontend, Backend e Banco) para garantir paridade total entre os ambientes de desenvolvimento e produção.
* **Esteira de CI/CD & Deploy:** Deploy automatizado e híbrido, utilizando a **Vercel** para ambientes de Preview do Frontend e a plataforma **Render** para a hospedagem da API Backend.
* **Insomnia:** Ambiente técnico utilizado para validação, automação de testes de endpoints e documentação de payloads da API.

---

## 🛡️ Arquitetura e Regras de Negócio Implementadas

* **Autenticação & Rotas Privadas:** O acervo de livros e autores é público para leitura de visitantes. No entanto, as operações de escrita e modificação exigem autenticação via token, liberando um painel administrativo protegido.
* **Segurança Dinâmica no CRUD:** Para garantir a integridade da aplicação, o ecossistema backend valida a propriedade dos registros, impedindo terminantemente que um usuário autenticado delete ou altere livros cadastrados por outra pessoa.
* **Integridade Referencial do Banco:** O banco de dados foi modelado com restrições rígidas que bloqueiam a exclusão de qualquer autor que possua livros vinculados ao seu nome, blindando a persistência contra registros órfãos.
* **Gerenciamento Ágil do Ciclo de Vida:** O planejamento, mapeamento de features, abertura de Issues e o controle de fluxo de ramificação de código (Git Flow) foram gerenciados de ponta a ponta utilizando o **GitHub Projects**.

---

## ⚙️ Como Executar o Projeto Localmente

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/hasansamisad/Projeto-Livraria.git](https://github.com/hasansamisad/Projeto-Livraria.git)
cd Projeto-Livraria
```

### 2. Configurar Variáveis de Ambiente
Verifique e configure os arquivos *.env* dentro das pastas *livraria-frontend* e *livraria-api* com suas credenciais locais (Portas, chaves de autenticação e strings de conexões de banco).

### 3. Subir a Aplicação com Docker
Na raiz do projeto (onde está o arquivo *docker-compose.yml*), execute o comando abaixo para construir as imagens e iniciar todos os serviços isolados em segundo plano:

### 4. Acessar a Aplicação
Assim que o Docker inicializar os containers com sucesso, os serviços estarão disponíveis em:

* *Frontend:* http://localhost:5173

* *API Backend:* http://localhost:3000

## 📂 Estrutura do Repositório

```Plaintext
├── livraria-api/          # Servidor Node.js, Sequelize ORM, Models e Validações (Backend)
├── livraria-frontend/     # Aplicação React, Componentes Reativos e Tailwind CSS (Frontend)
│   ├── src/
│   │   ├── components/    # Elementos de UI isolados e reutilizáveis (CardLivro, TabelaDados)
│   │   ├── pages/         # Telas da aplicação (HomeCatalogo, DetalhesLivro, LoginPainel)
│   │   └── routes/        # Arquitetura e guardas de segurança do React Router Dom
└── docker-compose.yml     # Orquestração multi-container de desenvolvimento
```

## Autor
*Hasan Sami Sad*

Graduando em Ciência da Computação pela UDF (3º Semestre).

Desenvolvedor Full Stack focado no ecossistema JavaScript/TypeScript, arquiteturas de software conteinerizadas e engenharia de software ágil.

* *LinkedIn:* [https://www.linkedin.com/in/hasan-computer-scientist/]

* GitHub: https://github.com/hasansamisad
