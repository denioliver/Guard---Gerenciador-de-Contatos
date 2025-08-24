import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithProviders } from '../test-utils';

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('Página de Login', () => {
  test('deve renderizar o formulário de login corretamente', () => {
    renderWithProviders(<Login />);

    expect(screen.getByRole('heading', { name: /acessar conta/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/insira sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /acessar conta/i })).toBeInTheDocument();
    expect(screen.getByText(/não tem uma conta/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /criar conta/i })).toBeInTheDocument();
  });

  test('deve mostrar erro quando campos obrigatórios não são preenchidos', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    const submitButton = screen.getByRole('button', { name: /acessar conta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i) || screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/senha é obrigatória/i) || screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
    });
  });
});
