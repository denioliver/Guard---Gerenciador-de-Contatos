import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContactIcon from '../../components/ContactIcon';

describe('Componente ContactIcon', () => {
  test('deve renderizar com tamanho padrão', () => {
    const { container } = render(<ContactIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  test('deve renderizar com tamanho personalizado', () => {
    const { container } = render(<ContactIcon size={30} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '30');
    expect(svg).toHaveAttribute('height', '30');
  });

  test('deve renderizar com cor padrão', () => {
    const { container } = render(<ContactIcon />);
    const path = container.querySelector('path');

    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  test('deve renderizar com cor personalizada', () => {
    const { container } = render(<ContactIcon color="#FF0000" />);
    const path = container.querySelector('path');

    expect(path).toHaveAttribute('fill', '#FF0000');
  });

  test('deve aplicar className quando fornecida', () => {
    const { container } = render(<ContactIcon className="custom-icon" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveClass('custom-icon');
  });
});
