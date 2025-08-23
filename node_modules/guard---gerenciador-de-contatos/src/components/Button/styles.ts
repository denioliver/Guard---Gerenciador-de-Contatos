import styled, { css } from 'styled-components';

type ContainerProps = {
  variant: 'primary' | 'secondary' | 'outline';
  fullWidth: boolean;
};

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  transition: all 0.2s ease;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${theme.colors.accent.brand};
          color: ${theme.colors.background.primary};
          
          &:hover {
            filter: brightness(1.1);
          }
          
          &:disabled {
            background-color: ${theme.colors.content.muted};
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.colors.background.secondary};
          color: ${theme.colors.content.primary};
          
          &:hover {
            background-color: ${theme.colors.background.tertiary};
          }
          
          &:disabled {
            color: ${theme.colors.content.muted};
            cursor: not-allowed;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 1px solid ${theme.colors.accent.brand};
          color: ${theme.colors.accent.brand};
          
          &:hover {
            background-color: ${theme.colors.accent.brand};
            color: ${theme.colors.background.primary};
          }
          
          &:disabled {
            border-color: ${theme.colors.content.muted};
            color: ${theme.colors.content.muted};
            cursor: not-allowed;
          }
        `;
    }
  }}
`;
