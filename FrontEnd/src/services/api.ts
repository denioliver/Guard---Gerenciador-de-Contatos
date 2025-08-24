import axios from 'axios';

// Função para tentar conectar em diferentes portas
const getBaseURL = () => {
  // Ordem de prioridade: VITE_API_URL > .env > portas padrão
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Lista de portas para tentar
  const portOptions = [3000, 3001, 3002, 3003];

  // Por padrão, começa com a porta 3000
  return `http://localhost:${portOptions[0]}`;
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('Nenhum token encontrado para autenticar a requisição!');
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Erro na requisição:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config
    });

    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config.url.includes('/auth/login');
      const isPasswordValidationRequest = error.config.url.includes('/auth/validate-password');

      if (!isLoginRequest && !isPasswordValidationRequest) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        sessionStorage.setItem('auth_error_message', 'Sua sessão expirou. Por favor, faça login novamente.');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
