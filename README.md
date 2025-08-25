# Guard - Gerenciador de Contatos

Um sistema completo de gerenciamento de contatos com autenticação de usuários, upload de imagens e interface moderna desenvolvida com React e NestJS.

## 📋 Visão Geral

## 🌐 URLs de Produção

- Frontend: [https://guard.up.railway.app/](https://guard.up.railway.app/)
- Backend (API): [https://guard-gerenciador-de-contatos-production.up.railway.app/api](https://guard-gerenciador-de-contatos-production.up.railway.app/api)

O Guard é uma aplicação web para gerenciar contatos pessoais, oferecendo recursos como:

- Cadastro e autenticação de usuários
- CRUD completo para gerenciamento de contatos
- Upload de avatares para contatos
- Interface responsiva e intuitiva
- API RESTful segura

## 🚀 Executando o Projeto

#### Backend (porta 3001)

```bash
cd BackEnd
npm install
npm run build
npm run start:prod
```

#### Frontend (porta 3000)

```bash
cd FrontEnd
npm install
npm run build
npx vite preview --port 3000
```

### Modo desenvolvimento

#### Backend (porta 3001)

```bash
cd BackEnd
npm install
npm run start:dev
```

#### Frontend (porta 5173, padrão do Vite)

```bash
cd FrontEnd
npm install
npm run dev
```

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
```

## 🚨 Solução de Problemas

### Portas em uso

Se você encontrar o erro `EADDRINUSE: address already in use :::3000` ao iniciar o servidor backend, você tem algumas opções:

1. **Usar script alternativo:** O projeto inclui scripts alternativos que utilizam portas diferentes:

   ```bash
   # Para iniciar apenas o backend em uma porta alternativa
   npm run start:backend:alt

   # Para iniciar todo o projeto com o backend em uma porta alternativa
   npm run start:alt
   ```

2. **Definir porta manualmente:**

   ```bash
   # Windows PowerShell
   $env:PORT=3001; npm --prefix BackEnd run start

   # Linux/Mac
   PORT=3001 npm --prefix BackEnd run start
   ```

3. **Configurar o frontend:** Se você alterar a porta do backend, pode ser necessário ajustar o arquivo `.env` no Frontend:

   ```
   VITE_API_URL=http://localhost:3001
   ```

### Conexão do frontend com o backend

O frontend está configurado para tentar se conectar automaticamente ao backend nas portas 3000, 3001, 3002 e 3003. Se você estiver executando o backend em uma porta diferente, configure a variável de ambiente `VITE_API_URL` no arquivo `.env` do frontend.
│ ├── routes/ # Configuração de rotas
│ ├── services/ # Serviços de API
│ └── styles/ # Estilos globais e temas
└── index.html # Entrada HTML principal

````

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
````

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- MongoDB
- npm ou yarn

### Configuração do Ambiente

#### 1. Clone o Repositório

```bash
git clone https://github.com/denioliver/Guard---Gerenciador-de-Contatos.git
cd Guard---Gerenciador-de-Contatos
```

#### 2. Configuração do Arquivo .env (Backend)

Crie um arquivo `.env` na pasta `BackEnd/` com as seguintes configurações:

```
# Configuração do MongoDB
MONGODB_URI=mongodb://localhost:27017/guard-contacts

# Chave secreta para tokens JWT (autenticação)
JWT_SECRET=ebc68422a8d86c62f47a40a13e89d3f7b2732c94a5611b7b9f1d11ec209c7722

# Tempo de expiração do token JWT em segundos (86400 = 24 horas)
JWT_EXPIRATION=86400
```

### Instalação e Execução

#### Opção 1: Execução com Scripts da Raiz (Recomendado)

Você pode executar toda a aplicação com apenas um comando usando os scripts da raiz do projeto:

```bash
# Instalar todas as dependências (Backend e Frontend)
npm install

# Iniciar em modo de desenvolvimento (Backend e Frontend juntos)
npm run dev

# OU, se a porta 3000 estiver em uso:
npm run dev:alt
```

#### Opção 2: Execução Individual de Cada Serviço

##### Backend

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

O servidor estará disponível em `http://localhost:3000` (ou porta alternativa).

##### Frontend

```bash
# Entrar no diretório do frontend
cd FrontEnd

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Construindo para Produção

```bash
# Construir ambos (Backend e Frontend)
npm run build

# Iniciar em modo de produção
npm run start

# OU, se a porta 3000 estiver em uso:
npm run start:alt
```

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
