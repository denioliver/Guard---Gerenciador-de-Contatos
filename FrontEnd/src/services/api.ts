import axios from 'axios';

/**
 * Determina a URL base para a API baseado no ambiente e contexto
 * @returns String com a URL base para a API
 */

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  const origin = window.location.origin;
  const isLocalhost = origin.includes('localhost');
  const isLocalIP = /^http:\/\/192\.168\.[0-9]+\.[0-9]+/.test(origin);

  if (isLocalhost && origin.includes(':3000')) {
    return 'http://localhost:3001';
  }

  if (isLocalIP && origin.includes(':3000')) {
    const match = origin.match(/^http:\/\/(192\.168\.[0-9]+\.[0-9]+)/);
    const ip = match ? match[1] : '192.168.0.1';
    return `http://${ip}:3001`;
  }

  if (origin.includes(':3000')) {
    return origin.replace(':3000', ':3001');
  }

  return 'http://localhost:3001';
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
