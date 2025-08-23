import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';
import { Checkbox } from '../../components/Checkbox';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import * as Styles from './styles';
import { loginSchema, type LoginFormData } from './schema';

function Login() {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    setFocus
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      rememberMe: false
    }
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        senha: data.password
      });
      console.log('Resposta do backend (login):', response.data);
      const dataResponse = response.data as { access_token?: string; token?: string };
      const token = dataResponse.access_token || dataResponse.token;
      console.log('Token capturado:', token);
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token JWT salvo:', token);
        navigate('/contacts');
      } else {
        setGeneralError('Token não recebido.');
      }
    } catch (err: unknown) {
      interface ErrorResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }

      const errorObj = err as ErrorResponse;

      if (
        typeof err === 'object' &&
        err !== null &&
        errorObj.response &&
        typeof errorObj.response === 'object' &&
        errorObj.response.data &&
        typeof errorObj.response.data === 'object' &&
        errorObj.response.data.message
      ) {
        setGeneralError(errorObj.response.data.message as string);
      } else {
        setGeneralError('Falha na autenticação. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
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
            Não tem uma conta? <Styles.CreateAccountLink as="a" href="/register">Criar conta</Styles.CreateAccountLink>
          </Styles.CreateAccountText>
        </Styles.Header>

        <Styles.FormContainer>
          <Styles.Title>Acessar conta</Styles.Title>

          {generalError && (
            <Styles.ErrorMessage>{generalError}</Styles.ErrorMessage>
          )}

          <Styles.Form onSubmit={handleSubmit(onSubmit)}>
            <Styles.FormGroup>
              <Styles.Label>E-mail</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className={errors.email ? 'error' : ''}
                  {...register('email')}
                />
                {watch('email') && (
                  <Styles.ClearButton
                    type="button"
                    onClick={() => setValue('email', '', { shouldValidate: true })}
                  >
                    <FiX color="#777777" size={16} />
                  </Styles.ClearButton>
                )}
              </Styles.InputContainer>
              {errors.email && (
                <Styles.ErrorText>{errors.email.message}</Styles.ErrorText>
              )}
            </Styles.FormGroup>

            <Styles.FormGroup>
              <Styles.Label>Senha</Styles.Label>
              <Styles.InputContainer>
                <Styles.Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Insira sua senha"
                  className={errors.password ? 'error' : ''}
                  {...register('password')}
                />
                <Styles.PasswordToggleButton
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </Styles.PasswordToggleButton>
              </Styles.InputContainer>
              {errors.password && (
                <Styles.ErrorText>{errors.password.message}</Styles.ErrorText>
              )}
              <Styles.ForgotPasswordLink href="#">
                Esqueci minha senha
              </Styles.ForgotPasswordLink>
            </Styles.FormGroup>

            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Lembrar-me neste dispositivo"
                  checked={field.value}
                  onChange={field.onChange}
                  name={field.name}
                />
              )}
            />

            <Styles.Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Styles.SpinAnimation>
                    <BiLoaderAlt size={18} />
                  </Styles.SpinAnimation>
                  Carregando...
                </>
              ) : (
                'Acessar conta'
              )}
            </Styles.Button>
          </Styles.Form>
        </Styles.FormContainer>
      </Styles.FormSection>
    </Styles.PageContainer>
  );
}

export default Login;
