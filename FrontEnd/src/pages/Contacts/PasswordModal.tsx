import { useState } from 'react';
import styled from 'styled-components';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import api from '../../services/api';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordVerified: () => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #222;
  border-radius: 12px;
  width: 400px;
  padding: 24px;
  position: relative;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #bdbdbd;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  &:hover {
    color: #fff;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  color: #bdbdbd;
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background: #333;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  padding-right: 40px;

  &:focus {
    border-color: #D6FF4B;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

const CancelButton = styled.button`
  background: #333;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #444;
  }
`;

const ConfirmButton = styled.button`
  background: #D6FF4B;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  color: #222;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: #c8f03e;
  }
  &:disabled {
    background: #555;
    color: #888;
    cursor: not-allowed;
  }
`;

const LoadingIcon = styled(BiLoaderAlt)`
  animation: spin 1s infinite linear;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function PasswordModal({ isOpen, onClose, onPasswordVerified }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyPassword = async () => {
    if (!password) {
      setError('Por favor, digite sua senha.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        console.error('Email do usuário não encontrado no localStorage');
        setError('Sessão expirada. Por favor, faça login novamente.');
        setIsLoading(false);
        return;
      }

      console.log('Tentando validar senha para:', userEmail);

      try {
        await api.post('/auth/validate-password', {
          email: userEmail,
          senha: password
        });

        onPasswordVerified();
        onClose();
        setPassword('');
      } catch (error) {
        console.error('Erro na API ao validar senha:', error);
        const apiError = error as {
          response?: {
            data?: {
              message?: string
            }
          },
          request?: unknown
        };

        if (apiError.response) {
          setError(apiError.response.data?.message || 'Senha incorreta. Tente novamente.');
        } else if (apiError.request) {
          setError('Erro de conexão com o servidor. Verifique sua conexão.');
        } else {
          setError('Erro ao validar senha. Tente novamente.');
        }
      }
    } catch (err) {
      console.error('Erro inesperado ao validar senha:', err);
      setError('Ocorreu um erro inesperado. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerifyPassword();
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            Visualizar informações
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <InputGroup>
          <Label>Senha</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua senha"
              autoFocus
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </ToggleButton>
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputGroup>

        <ButtonGroup>
          <CancelButton onClick={onClose}>Voltar</CancelButton>
          <ConfirmButton onClick={handleVerifyPassword} disabled={isLoading}>
            {isLoading ? <LoadingIcon size={18} /> : 'Confirmar'}
          </ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}
