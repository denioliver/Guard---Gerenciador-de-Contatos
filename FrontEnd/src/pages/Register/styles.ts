import styled from 'styled-components';
import backgroundBlur from '../../assets/imgs/backgroundBlur.png';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const BackgroundSection = styled.section`
  flex: 1;
  background-image: url('${backgroundBlur}');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start;
  padding: 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(22, 22, 22, 0.1);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 40px;
  top: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
`;

export const FormSection = styled.section`
  width: 497px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  padding: 40px 60px;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 40px;
  right: 88px;
  width: 160px;
  
  @media (max-width: 768px) {
    right: 40px;
  }
`;

export const CreateAccountText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.content.heading};
  margin: 0;
  text-align: right;
  white-space: nowrap;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 321px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.content.heading};
  margin-top: 20px;
  margin-bottom: 30px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 4px;  /* Reduzido o espaçamento inferior */
`;

export const Label = styled.label`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.content.primary};
  margin-bottom: 6px;
  display: block;
  font-weight: 500;
  text-align: left;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: 0.85rem;
  margin-bottom: 10px;
  height: 38px;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.content.placeholder};
    font-size: 0.8rem;
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent.brand};
    outline: none;
  }
  
  &.error {
    border-color: ${({ theme }) => theme.colors.accent.red};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.accent.red};
    }
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.accent.red};
  font-size: 0.7rem;  /* Tamanho do texto de erro reduzido */
  margin-top: 2px;
  display: block;
`;

export const ValidationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
`;

export const ValidationIcon = styled.span<{ valid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ valid }) => valid ? '#C4F120' : '#ff3b3b'};
  
  svg {
    color: #000000;
    width: 12px;
    height: 12px;
  }
`;

export const ValidationItem = styled.li<{ invalid: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.content.heading};
  font-size: 0.8rem;
  margin-bottom: 6px;
`;

export const SubmitButton = styled.button`
  width: 134px;
  height: 46px;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.accent.brand};
  color: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  margin-left: auto;
  white-space: nowrap;
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.content.muted};
    cursor: not-allowed;
  }
`;
