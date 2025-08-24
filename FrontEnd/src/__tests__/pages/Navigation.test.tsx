import { describe, test, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Login from '../../pages/Login';
import { renderWithProviders } from '../test-utils';
import type { ReactNode } from 'react';

// Mock do react-router-dom (simplificado para um teste mais básico)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ children }: { children: ReactNode }) => <a href="#mock-link">{children}</a>,
  };
});

describe('Elementos de navegação', () => {
  test('deve mostrar link para registro na página de login', () => {
    // Renderiza a página de Login 
    renderWithProviders(<Login />);

    // Verificar se está na página de login (verificar pelo input de email que é específico da tela de login)
    expect(screen.getByPlaceholderText(/digite seu e-mail/i)).toBeInTheDocument();

    // Verificar se o link para registro está presente
    expect(screen.getByText(/criar conta/i)).toBeInTheDocument();
  });
});
