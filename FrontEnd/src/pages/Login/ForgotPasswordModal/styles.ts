import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.content.heading};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.content.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const ModalContent = styled.div`
  margin-bottom: 24px;
`;

export const InputLabel = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.content.primary};
  margin-bottom: 6px;
  display: block;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: 0.9rem;
  margin-bottom: 12px;
  height: 38px;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.content.placeholder};
    font-size: 0.85rem;
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.brand};
    outline: none;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ theme, primary }) => primary ? theme.colors.accent.brand : theme.colors.background.secondary};
  color: ${({ theme, primary }) => primary ? theme.colors.background.primary : theme.colors.content.primary};
  border: ${({ theme, primary }) => primary ? 'none' : `1px solid ${theme.colors.background.tertiary}`};
  
  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.colors.accent.brandHover : theme.colors.background.tertiary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.accent.red};
  font-size: 0.85rem;
  margin-bottom: 16px;
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.accent.green};
  font-size: 0.85rem;
  margin-bottom: 16px;
`;
