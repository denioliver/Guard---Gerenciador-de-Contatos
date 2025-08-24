@echo off
echo ===================================================
echo === Guard - Gerenciador de Contatos (Instalação) ===
echo ===================================================
echo.

set /p confirm=Deseja instalar e construir a aplicação antes de executar? (S/N): 
if /i "%confirm%"=="S" (
  echo.
  echo === Instalando dependências e construindo o projeto ===
  
  echo.
  echo === Instalando e construindo o Back-end ===
  cd BackEnd
  call npm install
  if %errorlevel% neq 0 (
    echo Erro na instalação do backend.
    pause
    exit /b %errorlevel%
  )
  
  call npm run build
  if %errorlevel% neq 0 (
    echo Erro na construção do backend.
    pause
    exit /b %errorlevel%
  )
  cd ..
  
  echo.
  echo === Instalando e construindo o Front-end ===
  cd FrontEnd
  call npm install
  if %errorlevel% neq 0 (
    echo Erro na instalação do frontend.
    pause
    exit /b %errorlevel%
  )
  
  call npm run build
  if %errorlevel% neq 0 (
    echo Erro na construção do frontend.
    pause
    exit /b %errorlevel%
  )
  cd ..
)

echo.
echo ============================================
echo === Iniciando Front-end e Back-end em paralelo ===
echo ============================================
echo.

echo === Iniciando o MongoDB (se instalado) ===
start cmd /k "mongod --dbpath=BackEnd/data/db"

echo === Iniciando o Back-end (porta 3001) ===
start cmd /k "cd BackEnd && echo === Back-end === && npm run start:prod"

echo === Aguardando o backend iniciar... ===
timeout /t 5 /nobreak

echo === Iniciando o Front-end (porta 3000) ===
start cmd /k "cd FrontEnd && echo === Front-end === && npx vite preview --port 3000"

echo.
echo === Servidores iniciados em janelas separadas ===
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3001
echo MongoDB: mongodb://localhost:27017
echo.
echo Pressione qualquer tecla para encerrar todas as aplicações...
echo.
