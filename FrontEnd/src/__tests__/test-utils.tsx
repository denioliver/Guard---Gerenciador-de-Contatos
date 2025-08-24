import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { MemoryRouterProps } from 'react-router-dom';

import { theme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';

interface AllProvidersProps {
  children: ReactNode;
}

export const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: AllProviders });
};

interface CustomRouterProps extends MemoryRouterProps {
  children: ReactNode;
}

export const CustomRouter = ({ children, ...props }: CustomRouterProps) => {
  return (
    <MemoryRouter {...props}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
};

export const renderWithRouter = (ui: React.ReactElement, options?: MemoryRouterProps) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <CustomRouter {...options}>{children}</CustomRouter>
    )
  });
};
