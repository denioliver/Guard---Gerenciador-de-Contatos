import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import * as S from './styles';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string) => Promise<void>;
}

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    if (onSubmit) {
      setIsLoading(true);
      setError(null);
      try {
        await onSubmit(email);
        setSuccess('Uma senha temporária foi enviada para o seu e-mail.');
        setEmail('');
      } catch (err: unknown) {
        const error = err as Error;
        setError(error.message || 'Ocorreu um erro ao processar sua solicitação.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={e => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Recupere sua senha</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <FiX size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {success && <S.SuccessMessage>{success}</S.SuccessMessage>}

          <form onSubmit={handleSubmit}>
            <S.InputLabel htmlFor="forgotPasswordEmail">E-mail</S.InputLabel>
            <S.Input
              id="forgotPasswordEmail"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <S.ModalFooter>
              <S.Button type="button" onClick={onClose}>
                Voltar
              </S.Button>
              <S.Button type="submit" primary disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </S.Button>
            </S.ModalFooter>
          </form>
        </S.ModalContent>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ForgotPasswordModal;
