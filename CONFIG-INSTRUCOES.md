# Configuração do Ambiente para Guard - Gerenciador de Contatos

Olá! Para que a aplicação funcione corretamente, você precisará criar arquivos de configuração de ambiente. Siga os passos abaixo:

## 1. Criar o arquivo .env no backend

Crie um arquivo chamado `.env` na pasta raiz do backend:

```
Guard---Gerenciador-de-Contatos/BackEnd/.env
```

## 2. Copie e ajuste as seguintes configurações

Cole o texto abaixo no arquivo `.env` e faça as substituições necessárias:

```
# Configuração do MongoDB (mantenha assim para usar localmente ou ajuste para seu servidor)
MONGODB_URI=mongodb://localhost:27017/guard-contacts

# Chave secreta para tokens JWT (autenticação)
JWT_SECRET=ebc68422a8d86c62f47a40a13e89d3f7b2732c94a5611b7b9f1d11ec209c7722
JWT_EXPIRATION=86400
```

## 3. Iniciar o servidor MongoDB

Se você não tiver o MongoDB rodando como serviço, pode iniciá-lo usando:

```bash
npm run start:mongodb
```

## 4. Iniciar o backend

Após configurar o arquivo .env, você pode iniciar o servidor backend:

```bash
cd BackEnd
npm install
npm run start:dev
```

## 5. Iniciar o frontend (em outro terminal)

```bash
cd FrontEnd
npm install
npm run dev
```

## Observações importantes:

- O MongoDB deve estar rodando antes de iniciar o backend
- As configurações de email são necessárias para a funcionalidade de recuperação de senha
- Se encontrar problemas com o envio de email, verifique se as credenciais estão corretas e se o provedor de email permite aplicações menos seguras

Qualquer dúvida ou problema durante a configuração, por favor entre em contato.

Obrigado por testar o Guard - Gerenciador de Contatos!
