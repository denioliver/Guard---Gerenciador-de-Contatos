import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CheckboxInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing.sm};
  position: relative;
  
  &:checked {
    background-color: ${({ theme }) => theme.colors.accent.brand};
    border-color: ${({ theme }) => theme.colors.accent.brand};
    
    &::after {
      content: '';
      position: absolute;
      width: 5px;
      height: 10px;
      border: solid ${({ theme }) => theme.colors.background.primary};
      border-width: 0 2px 2px 0;
      left: 6px;
      top: 2px;
      transform: rotate(45deg);
    }
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent.brand};
    outline-offset: 1px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  color: ${({ theme }) => theme.colors.content.primary};
  cursor: pointer;
`;
