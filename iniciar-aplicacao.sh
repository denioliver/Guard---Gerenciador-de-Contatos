#!/bin/bash

echo "==================================================="
echo "=== Guard - Gerenciador de Contatos (Instalação) ==="
echo "==================================================="
echo

read -p "Deseja instalar e construir a aplicação antes de executar? (S/N): " confirm
if [[ "$confirm" == [Ss]* ]]; then
  echo
  echo "=== Instalando dependências e construindo o projeto ==="
  
  echo
  echo "=== Instalando e construindo o Back-end ==="
  cd BackEnd
  npm install
  if [ $? -ne 0 ]; then
    echo "Erro na instalação do backend."
    read -p "Pressione Enter para sair..."
    exit 1
  fi
  
  npm run build
  if [ $? -ne 0 ]; then
    echo "Erro na construção do backend."
    read -p "Pressione Enter para sair..."
    exit 1
  fi
  cd ..
  
  echo
  echo "=== Instalando e construindo o Front-end ==="
  cd FrontEnd
  npm install
  if [ $? -ne 0 ]; then
    echo "Erro na instalação do frontend."
    read -p "Pressione Enter para sair..."
    exit 1
  fi
  
  npm run build
  if [ $? -ne 0 ]; then
    echo "Erro na construção do frontend."
    read -p "Pressione Enter para sair..."
    exit 1
  fi
  cd ..
fi

echo
echo "============================================"
echo "=== Iniciando Front-end e Back-end em paralelo ==="
echo "============================================"
echo

# Verificar se o MongoDB está instalado
if command -v mongod &> /dev/null; then
  echo "=== Iniciando o MongoDB ==="
  mkdir -p BackEnd/data/db
  mongod --dbpath=BackEnd/data/db &
  MONGO_PID=$!
else
  echo "MongoDB não encontrado. Certifique-se de que o MongoDB está instalado e em execução."
fi

echo "=== Iniciando o Back-end (porta 3001) ==="
cd BackEnd
npm run start:prod &
BACKEND_PID=$!
cd ..

echo "=== Aguardando o backend iniciar... ==="
sleep 5

echo "=== Iniciando o Front-end (porta 3000) ==="
cd FrontEnd
npx vite preview --port 3000 &
FRONTEND_PID=$!
cd ..

echo
echo "=== Servidores iniciados ==="
echo
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo "MongoDB: mongodb://localhost:27017"
echo
echo "Pressione Ctrl+C para encerrar todas as aplicações..."

# Capturar sinal para encerrar processos
trap "kill $FRONTEND_PID $BACKEND_PID $MONGO_PID 2>/dev/null" EXIT

# Manter o script rodando
wait
