import { describe, test, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Login from '../../pages/Login';
import { renderWithProviders } from '../test-utils';
import type { ReactNode } from 'react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ children }: { children: ReactNode }) => <a href="#mock-link">{children}</a>,
  };
});

describe('Elementos de navegação', () => {
  test('deve mostrar link para registro na página de login', () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText(/digite seu e-mail/i)).toBeInTheDocument();

    expect(screen.getByText(/criar conta/i)).toBeInTheDocument();
  });
});
