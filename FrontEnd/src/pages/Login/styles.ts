import styled from 'styled-components';

// Container da página inteira
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

// Seção de background com a imagem de fundo
export const BackgroundSection = styled.div`
  flex: 1;
  background-image: url('/src/assets/imgs/backgroundBlur.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

// Seção do formulário
export const FormSection = styled.div`
  width: 40%;
  min-width: 450px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CreateAccountText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  color: ${({ theme }) => theme.colors.content.muted};
`;

export const CreateAccountLink = styled.a`
  color: ${({ theme }) => theme.colors.accent.brand};
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.heading};
  color: ${({ theme }) => theme.colors.content.heading};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.labelMedium};
  color: ${({ theme }) => theme.colors.content.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.content.primary};
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.content.placeholder};
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
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.accent.brand};
  color: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.textMedium};
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 48px;
  
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
  font-size: ${({ theme }) => theme.fontSize.textSmall};
  text-align: right;
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;
