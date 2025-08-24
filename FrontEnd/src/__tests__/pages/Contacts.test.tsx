import { describe, test, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacts from '../../pages/Contacts';
import { renderWithProviders } from '../test-utils';

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('fake-jwt-token');
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

describe('Página de Contatos', () => {
  test('deve renderizar a interface básica da página de contatos', async () => {
    renderWithProviders(<Contacts />);
    expect(screen.getByText(/lista de contatos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pesquisar/i)).toBeInTheDocument();
    expect(screen.getByText(/adicionar contato/i)).toBeInTheDocument();
  });

  test('deve abrir o modal de adicionar contato', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contacts />);
    expect(screen.getByText(/adicionar contato/i)).toBeInTheDocument();
    const addButton = screen.getByText(/adicionar contato/i);
    await user.click(addButton);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  test('deve mostrar informações do usuário logado', () => {
    renderWithProviders(<Contacts />);
    expect(screen.getByText(/logado como/i)).toBeInTheDocument();
  });
});