
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { registerSchema } from './schema';
import Logo from '../../components/Logo';
import * as Styles from './styles';
import { FiX, FiCheck } from 'react-icons/fi';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(registerSchema) });

  const senha = watch('senha');
  const confirmarSenha = watch('confirmarSenha');

  interface RegisterFormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setError('');
    try {
      await axios.post('http://localhost:3000/auth/register', data);
      navigate('/');
    } catch {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <Styles.PageContainer>
      <Styles.BackgroundSection>
        <Styles.LogoContainer>
          <Logo size="large" />
        </Styles.LogoContainer>
      </Styles.BackgroundSection>

      <Styles.FormSection>
        <Styles.Header>
          <Styles.CreateAccountText>
            Já tem uma conta?<Link to="/" style={{ color: '#C4F120', fontWeight: 500, fontSize: '0.75rem', marginLeft: '4px', textDecoration: 'none' }}>Acessar conta</Link>
          </Styles.CreateAccountText>
        </Styles.Header>

        <Styles.FormContainer>
          <Styles.Title>Criar conta</Styles.Title>

          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Styles.FormGroup>
              <Styles.Label>Nome</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input {...register('nome')} placeholder="Como você se chama?" className={errors.nome ? 'error' : ''} />
              </Styles.InputContainer>
              {errors.nome && <Styles.ErrorMessage>{errors.nome.message}</Styles.ErrorMessage>}
            </Styles.FormGroup>

            <Styles.FormGroup>
              <Styles.Label>E-mail</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input {...register('email')} placeholder="Seu e-mail aqui" className={errors.email ? 'error' : ''} />
              </Styles.InputContainer>
              {errors.email && <Styles.ErrorMessage>{errors.email.message}</Styles.ErrorMessage>}
            </Styles.FormGroup>

            <Styles.FormGroup>
              <Styles.Label>Senha</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input type="password" {...register('senha')} placeholder="Escolha uma senha segura" className={errors.senha ? 'error' : ''} />
              </Styles.InputContainer>
              {errors.senha && <Styles.ErrorMessage>{errors.senha.message}</Styles.ErrorMessage>}
            </Styles.FormGroup>

            <Styles.FormGroup>
              <Styles.Label>Repetir a senha</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input type="password" {...register('confirmarSenha')} placeholder="Repita sua senha para confirmar" className={errors.confirmarSenha ? 'error' : ''} />
              </Styles.InputContainer>
              {errors.confirmarSenha && <Styles.ErrorMessage>{errors.confirmarSenha.message}</Styles.ErrorMessage>}
            </Styles.FormGroup>

            <Styles.ValidationList>
              <Styles.ValidationItem invalid={!(senha && senha.length >= 8)}>
                <Styles.ValidationIcon valid={senha && senha.length >= 8}>
                  {senha && senha.length >= 8 ? <FiCheck /> : <FiX />}
                </Styles.ValidationIcon>
                Pelo menos 8 caracteres
              </Styles.ValidationItem>
              <Styles.ValidationItem invalid={!(senha && /[0-9!@#$%^&*]/.test(senha))}>
                <Styles.ValidationIcon valid={senha && /[0-9!@#$%^&*]/.test(senha)}>
                  {senha && /[0-9!@#$%^&*]/.test(senha) ? <FiCheck /> : <FiX />}
                </Styles.ValidationIcon>
                Contém um número ou símbolo
              </Styles.ValidationItem>
              <Styles.ValidationItem invalid={!(senha && confirmarSenha && senha === confirmarSenha)}>
                <Styles.ValidationIcon valid={senha && confirmarSenha && senha === confirmarSenha}>
                  {senha && confirmarSenha && senha === confirmarSenha ? <FiCheck /> : <FiX />}
                </Styles.ValidationIcon>
                As senhas devem ser iguais
              </Styles.ValidationItem>
            </Styles.ValidationList>

            {error && <Styles.ErrorMessage>{error}</Styles.ErrorMessage>}

            <Styles.SubmitButton type="submit">Criar conta</Styles.SubmitButton>
          </Styles.Form>
        </Styles.FormContainer>
      </Styles.FormSection>
    </Styles.PageContainer>
  );
}
