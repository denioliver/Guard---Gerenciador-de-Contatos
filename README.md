# Guard - Gerenciador de Contatos

Um sistema completo de gerenciamento de contatos com autenticação de usuários, upload de imagens e interface moderna desenvolvida com React e NestJS.

## 📋 Visão Geral

O Guard é uma aplicação web para gerenciar contatos pessoais, oferecendo recursos como:

- Cadastro e autenticação de usuários
- CRUD completo para gerenciamento de contatos
- Upload de avatares para contatos
- Interface responsiva e intuitiva
- API RESTful segura

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas partes principais:

```
/
├── BackEnd/         # API NestJS
├── FrontEnd/        # Interface React
└── ERD-Diagram.md   # Diagrama de Entidade-Relacionamento
```

### Backend (NestJS)

```
BackEnd/
├── src/
│   ├── __tests__/        # Testes unitários organizados por módulo
│   ├── auth/             # Módulo de autenticação
│   ├── config/           # Configurações (database, etc)
│   ├── contacts/         # Módulo de contatos
│   ├── schemas/          # Esquemas Mongoose
│   ├── users/            # Módulo de usuários
│   └── main.ts           # Ponto de entrada da aplicação
├── test/                 # Testes e2e
└── nest-cli.json         # Configuração do NestJS
```

### Frontend (React + Vite)

```
FrontEnd/
├── src/
│   ├── __tests__/        # Testes unitários
│   ├── assets/           # Recursos estáticos (imagens, ícones)
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Páginas da aplicação
│   ├── routes/           # Configuração de rotas
│   ├── services/         # Serviços de API
│   └── styles/           # Estilos globais e temas
└── index.html            # Entrada HTML principal
```

## 📊 Modelo de Dados

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        string nome
        string email UK
        string senha
        date createdAt
        date updatedAt
    }

    CONTACT {
        ObjectId _id PK
        string nome
        string email
        string telefone
        string observacoes
        ObjectId usuario FK
        string avatar
        date createdAt
        date updatedAt
    }

    USER ||--o{ CONTACT : "possui"
```

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- MongoDB
- npm ou yarn

### Instalação e Execução

#### Backend

```bash
# Entrar no diretório do backend
cd BackEnd

# Instalar dependências
npm install

# Iniciar o MongoDB (se estiver executando localmente)
npm run start:mongodb

# Iniciar o servidor em modo de desenvolvimento
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`.

#### Frontend

```bash
# Entrar no diretório do frontend
cd FrontEnd

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## 🧪 Testes

### Backend

```bash
# Executar testes unitários
cd BackEnd
npm test

# Executar testes com cobertura
npm run test:cov
```

### Frontend

```bash
# Executar testes unitários
cd FrontEnd
npm test
```

## 🔧 Tecnologias Utilizadas

### Backend

- **NestJS**: Framework para construção de aplicações escaláveis baseado em TypeScript
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação baseada em tokens
- **Jest**: Framework de testes

### Frontend

- **React**: Biblioteca para construção de interfaces
- **Vite**: Build tool e dev server
- **Styled Components**: Biblioteca para estilização
- **React Router**: Roteamento no cliente
- **Axios**: Cliente HTTP para comunicação com a API
- **Vitest**: Framework de testes para projetos Vite

## 🧠 Decisões Técnicas

### Backend

1. **Arquitetura NestJS**: Adotamos a arquitetura modular do NestJS que segue princípios SOLID e favorece a injeção de dependências, facilitando testes e manutenção.

2. **MongoDB com Mongoose**: Escolhemos MongoDB pela flexibilidade de esquema e Mongoose para modelagem de dados com validações.

3. **Estratégia de Autenticação**: Utilizamos JWT para autenticação stateless, com estratégia local para login.

4. **Upload de Arquivos**: Implementamos upload de imagens com gerenciamento eficiente dos arquivos.

5. **Organização de Testes**: Estruturamos os testes em uma pasta `__tests__` separada, organizada por módulos, para melhorar a manutenção.

### Frontend

1. **React + Vite**: Escolhemos Vite pelo rápido HMR e build eficiente, melhorando a experiência de desenvolvimento.

2. **Styled Components**: Adotamos CSS-in-JS para estilização com escopo isolado, facilitando a manutenção de componentes.

3. **Estrutura de Pastas**: Organizamos o código separando componentes, páginas e serviços para melhor manutenção.

4. **Gerenciamento de Estado**: Utilizamos hooks do React para gerenciamento de estado local e contextual, sem necessidade de bibliotecas adicionais.

5. **Testes Unitários**: Implementamos testes para garantir a qualidade dos componentes e funcionalidades.

## 📜 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Desenvolvido por [Denivan Oliveira](https://github.com/denioliver/Guard---Gerenciador-de-Contatos)
