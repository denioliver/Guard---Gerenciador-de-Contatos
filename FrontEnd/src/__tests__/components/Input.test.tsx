import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../../components/Input';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Componente Input', () => {
  test('deve renderizar com placeholder', () => {
    renderWithTheme(<Input placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument();
  });

  test('deve renderizar com label quando fornecida', () => {
    renderWithTheme(<Input label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  test('deve renderizar mensagem de erro quando fornecida', () => {
    renderWithTheme(
      <Input
        label="Email"
        placeholder="Digite seu email"
        error="Email inválido"
      />
    );
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  test('deve atualizar valor quando o usuário digita', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Input placeholder="Digite algo" />);

    const input = screen.getByPlaceholderText('Digite algo');
    await user.type(input, 'texto de teste');

    expect(input).toHaveValue('texto de teste');
  });

  test('deve chamar onChange quando o valor muda', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(<Input placeholder="Digite algo" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Digite algo');
    await user.type(input, 't');

    expect(handleChange).toHaveBeenCalled();
  });

  test('deve aceitar outros atributos HTML de input', () => {
    renderWithTheme(
      <Input
        type="password"
        placeholder="Digite sua senha"
        maxLength={10}
        required
      />
    );

    const input = screen.getByPlaceholderText('Digite sua senha');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('maxlength', '10');
    expect(input).toHaveAttribute('required');
  });
});
