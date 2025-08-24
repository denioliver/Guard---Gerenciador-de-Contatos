import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../components/Checkbox';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Componente Checkbox', () => {
  test('deve renderizar com label corretamente', () => {
    renderWithTheme(
      <Checkbox
        label="Aceitar termos"
        checked={false}
        onChange={() => { }}
        name="termos"
      />
    );

    expect(screen.getByText('Aceitar termos')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('deve renderizar no estado checked quando a prop checked é true', () => {
    renderWithTheme(
      <Checkbox
        label="Aceitar termos"
        checked={true}
        onChange={() => { }}
        name="termos"
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('deve chamar onChange com o valor correto quando clicado', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <Checkbox
        label="Aceitar termos"
        checked={false}
        onChange={handleChange}
        name="termos"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('deve usar id fornecido ou name como fallback', () => {
    renderWithTheme(
      <Checkbox
        label="Com ID personalizado"
        checked={false}
        onChange={() => { }}
        name="checkbox1"
        id="custom-id"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');

    // Testar com fallback para name
    renderWithTheme(
      <Checkbox
        label="Sem ID personalizado"
        checked={false}
        onChange={() => { }}
        name="checkbox2"
      />
    );

    const checkboxWithFallbackId = screen.getByLabelText('Sem ID personalizado');
    expect(checkboxWithFallbackId).toHaveAttribute('id', 'checkbox2');
  });
});
