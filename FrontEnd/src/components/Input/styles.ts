import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.labelMedium};
  color: ${({ theme }) => theme.colors.content.primary};
  font-weight: 500;
`;

export const InputField = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme, hasError }) =>
    hasError
      ? theme.colors.accent.red
      : theme.colors.background.tertiary
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  width: 100%;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.content.placeholder};
  }
  
  &:focus {
    border-color: ${({ theme, hasError }) =>
    hasError
      ? theme.colors.accent.red
      : theme.colors.accent.brand
  };
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.accent.red};
  font-size: ${({ theme }) => theme.fontSize.textSmall};
`;
