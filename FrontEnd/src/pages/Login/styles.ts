import styled, { keyframes } from 'styled-components';
import backgroundBlur from '../../assets/imgs/backgroundBlur.png';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinAnimation = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${rotate} 0.8s linear infinite;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  flex-wrap: wrap;
`;

export const BackgroundSection = styled.div`
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

export const FormSection = styled.div`
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

export const CreateAccountLink = styled.a`
  color: ${({ theme }) => theme.colors.accent.brand};
  font-weight: 500;
  font-size: 0.75rem;
  text-decoration: none;
  margin-left: 4px;
  
  &:hover {
    text-decoration: underline;
  }
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
  margin-bottom: 40px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: 0.9rem;
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
  
  &.error {
    border-color: ${({ theme }) => theme.colors.accent.red};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.accent.red};
    }
  }
`;

export const InputButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.content.muted};
  
  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }
`;

export const PasswordToggleButton = styled(InputButton)``;

export const ClearButton = styled(InputButton)``;

export const Button = styled.button`
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
  margin-top: 32px;
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

export const ErrorMessage = styled.div`
  background-color: rgba(230, 30, 50, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.accent.red};
  color: ${({ theme }) => theme.colors.accent.red};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.textSmall};
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.accent.red};
  font-size: ${({ theme }) => theme.fontSize.textSmall};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const ForgotPasswordLink = styled.a`
  color: ${({ theme }) => theme.colors.accent.brand};
  font-size: 0.8rem;
  text-align: right;
  display: block;
  margin-top: 4px;
  font-weight: 500;
  width: 100%;
  
  &:hover {
    text-decoration: underline;
  }
`;
