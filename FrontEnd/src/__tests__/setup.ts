import '@testing-library/jest-dom/vitest';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

afterEach(() => {
  cleanup();
});

export const handlers = [
  http.post('http://localhost:3000/auth/login', async ({ request }) => {
    const body = await request.json();
    const { email, senha } = body as { email: string; senha: string };

    if (email === 'teste@example.com' && senha === '123456') {
      return HttpResponse.json({
        access_token: 'fake-jwt-token',
      }, { status: 200 });
    }

    return HttpResponse.json({
      message: 'Email ou senha inválidos',
    }, { status: 401 });
  }),

  http.get('http://localhost:3000/contacts', ({ request }) => {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token || token !== 'fake-jwt-token') {
      return HttpResponse.json({
        message: 'Não autorizado',
      }, { status: 401 });
    }

    return HttpResponse.json([
      {
        _id: '1',
        nome: 'John Doe',
        type: 'Pessoal',
        telefone: '(11) 99999-9999',
        email: 'john@example.com',
        avatar: '',
      },
      {
        _id: '2',
        nome: 'Jane Smith',
        type: 'Trabalho',
        telefone: '(11) 88888-8888',
        email: 'jane@example.com',
        avatar: '',
      }
    ], { status: 200 });
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));// Close server after all tests
afterAll(() => server.close());

afterEach(() => server.resetHandlers());
