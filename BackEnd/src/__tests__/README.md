# Testes do Backend

Este diretório contém testes unitários para os componentes do backend do projeto Guard - Gerenciador de Contatos.

## Estrutura

Os testes estão organizados em diretórios que espelham a estrutura do código fonte:

- `__tests__/app`: Testes para os componentes principais da aplicação
  - `app.controller.spec.ts`: Testes para o controlador principal

- `__tests__/auth`: Testes para funcionalidades de autenticação
  - `auth.service.spec.ts`: Testes para o serviço de autenticação

- `__tests__/contacts`: Testes para funcionalidades de contatos
  - `contacts.controller.spec.ts`: Testes para o controlador de contatos
  - `contacts.service.spec.ts`: Testes para o serviço de contatos

## Executando os Testes

Para executar os testes, utilize o comando:

```bash
npm test
```

Para executar com cobertura:

```bash
npm run test:cov
```

## Mocks

Os testes utilizam mocks para componentes externos e serviços, como:

- Mongoose Models
- JwtService
- UsersService
- bcrypt
