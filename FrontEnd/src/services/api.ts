import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      sessionStorage.setItem('auth_error_message', 'Sua sessão expirou. Por favor, faça login novamente.');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
