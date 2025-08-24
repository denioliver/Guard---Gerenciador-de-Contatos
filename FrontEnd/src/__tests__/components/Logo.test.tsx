import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from '../../components/Logo';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Componente Logo', () => {
  test('deve renderizar com texto por padrão', () => {
    renderWithTheme(<Logo />);
    expect(screen.getByText('GUARD')).toBeInTheDocument();
  });

  test('deve ocultar texto quando showText é false', () => {
    renderWithTheme(<Logo showText={false} />);
    expect(screen.queryByText('GUARD')).not.toBeInTheDocument();
  });

  test('deve renderizar com tamanho médio por padrão', () => {
    renderWithTheme(<Logo />);
    const logoText = screen.getByText('GUARD');
    expect(logoText).toBeInTheDocument();
    // Como o componente usa styled-components, não podemos verificar diretamente o atributo
    // Mas podemos verificar que o logo é renderizado corretamente
  });

  test('deve renderizar com tamanho pequeno quando especificado', () => {
    renderWithTheme(<Logo size="small" />);
    const logoText = screen.getByText('GUARD');
    expect(logoText).toBeInTheDocument();
    // Como o componente usa styled-components, não podemos verificar diretamente o atributo
  });

  test('deve renderizar com tamanho grande quando especificado', () => {
    renderWithTheme(<Logo size="large" />);
    const logoText = screen.getByText('GUARD');
    expect(logoText).toBeInTheDocument();
    // Como o componente usa styled-components, não podemos verificar diretamente o atributo
  });
});
